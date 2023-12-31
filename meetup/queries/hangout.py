from fastapi import HTTPException
from pydantic import BaseModel
from queries.pool import conn
from typing import Optional, List, Union
from datetime import date, datetime
from pymongo.cursor import Cursor
from queries.user import UserRepo


db = conn["Hangouts"]
collection = db["hangouts"]
collection.create_index("name", unique=True)
user_repo = UserRepo()



class Friend(BaseModel):
    username: str
    selected_date: str


class HangoutIn(BaseModel):
    location: str
    friends: List[Friend]
    dates: List[date]
    finalized_date: date
    name: str
    host: str
    description: str


class HangoutOut(BaseModel):
    location: str
    friends: List[Friend]
    dates: List[str]
    finalized_date: str
    name: str
    host: str
    description: str


class UpdateHangoutModel(BaseModel):
    hangout_id: Optional[str]
    location: Optional[str]
    friends: Optional[List[Friend]]
    dates: Optional[List[date]]
    finalized_date: Optional[date]
    name: Optional[str]
    host: Optional[str]
    description: Optional[str]


class HangoutRepo:
    def get_all_hangouts(self) -> Cursor:
        try:
            return collection.find()
        except Exception:
            raise Exception("There was an error when finding all schedules")

    def get_users_in_hangout(self, hangout_name: str) -> Cursor:
        try:
            hangout = collection.find_one(
                {"name": hangout_name}, {"friends": 1}
            )
            if hangout is None or "friends" not in hangout:
                return []
            else:
                return hangout["friends"]
        except Exception:
            raise Exception(
                "There was an error when getting users in the hangout"
            )

    def get_current_user_hangouts(self, username: str) -> List[HangoutOut]:
        try:
            hangouts = collection.find({
            "$or": [
                {"friends.username": username},
                {"host": username}
            ]
            })
            return [HangoutOut(**hangout) for hangout in hangouts]
        except Exception as e:
            raise Exception("There was an error getting your hangouts" + str(e))

    def create_hangout(self, hangout: HangoutIn) -> HangoutOut:
        inserted_hangout = hangout.dict()
        for friend in inserted_hangout["friends"]:
            friend["selected_date"] = str(friend["selected_date"])
        inserted_hangout["dates"] = [str(d) for d in inserted_hangout["dates"]]
        inserted_hangout["finalized_date"] = str(
            inserted_hangout["finalized_date"]
        )
        try:
            result = collection.insert_one(inserted_hangout)
            inserted_hangout["hangout_id"] = str(result.inserted_id)
            for friend in inserted_hangout["friends"]:
                username = friend["username"]
                user_repo.user_hangouts(username, inserted_hangout["name"])
            return HangoutOut(**inserted_hangout)
        except Exception as e:
            raise Exception(
                "There was an error when creating a hangout: " + str(e)
            )

    def get_one_hangout(self, name: str) -> HangoutOut:
        try:
            hangout = collection.find_one({"name": name})
            if hangout:
                hangout["_id"] = str(hangout["_id"])
                return HangoutOut(**hangout)
            else:
                raise HTTPException(
                    status_code=404, detail="Hangout not found"
                )
        except Exception:
            raise Exception("There was an error when getting a hangout")

    def update_hangout(self, name: str, hangout: UpdateHangoutModel) -> Optional[HangoutOut]:
        existing_hangout = self.get_one_hangout(name)
        if existing_hangout:
            updated_data = hangout.dict(exclude_unset=True)
            for friend in updated_data["friends"]:
                friend["selected_date"] = str(friend["selected_date"])
            updated_data["dates"] = [str(d) for d in updated_data["dates"]]
            updated_data["finalized_date"] = str(updated_data["finalized_date"])
            updated_document = {"$set": updated_data}
            try:
                collection.update_one({"name": name}, updated_document)
                collection_users = db["users"]
                collection_users.update_many(
                    {"hangouts.name": name}, updated_document
                )
                for friend in updated_data["friends"]:
                    username = friend["username"]
                    user_repo.user_hangouts(
                        username, name, updated_data["name"]
                    )
                return HangoutOut(**updated_data)
            except Exception as e:
                raise Exception(e)
        return None

    def delete_hangout(self, name: str) -> Optional[HangoutOut]:
        hangout = self.get_one_hangout(name)
        if hangout is None:
            return None
        try:
            collection.delete_one({"name": name})
            return hangout
        except Exception:
            raise Exception("There was an error when deleting a hangout")

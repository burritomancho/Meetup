from fastapi import HTTPException
from pydantic import BaseModel
from queries.pool import conn
from typing import Optional, List, Union
from datetime import date, datetime
from pymongo.errors import DuplicateKeyError
from pymongo.cursor import Cursor

db = conn["Hangouts"]
collection = db["hangouts"]
collection.create_index("name", unique=True)


class HangoutIn(BaseModel):
    location: str
    friends: List[str]
    days: date
    name: str
    notes: str


class HangoutOut(BaseModel):
    hangout_id: Optional[Union[int, str]]
    location: str
    friends: List[str]
    days: date
    name: str
    notes: str


class UpdateHangoutModel(BaseModel):
    location: Optional[str]
    friends: Optional[List[str]]
    days: Optional[date]
    name: Optional[str]
    notes: Optional[str]


class DuplicateHangoutName(ValueError):
    def __init__(self):
        super().__init__("Hangout with this name already exists")


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

    def create_hangout(self, hangout: HangoutIn) -> HangoutOut:
        inserted_hangout = hangout.dict()
        inserted_hangout["days"] = datetime.combine(
            inserted_hangout["days"], datetime.min.time()
        )
        try:
            result = collection.insert_one(inserted_hangout)
            inserted_hangout["hangout_id"] = str(
                result.inserted_id
            )
            return HangoutOut(**inserted_hangout)
        except DuplicateKeyError:
            raise DuplicateHangoutName()
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

    def update_hangout(
        self, name: str, hangout: UpdateHangoutModel
    ) -> Optional[HangoutOut]:
        existing_hangout = self.get_one_hangout(name)
        if existing_hangout:
            updated_data = hangout.dict(exclude_unset=True)
            try:
                updated_hangout = existing_hangout.copy(update=updated_data)
                updated_document = updated_hangout.dict()
                result = collection.update_one({"name": name}, {"$set": updated_document})

                if result.matched_count == 0:
                    raise HTTPException(status_code=404, detail="Hangout not found")

                return updated_hangout
            except DuplicateKeyError:
                raise DuplicateHangoutName()
            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))
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

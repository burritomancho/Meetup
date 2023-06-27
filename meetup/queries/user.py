from fastapi import HTTPException
from pydantic import BaseModel
from queries.pool import conn
from typing import Optional, Dict
from pymongo.errors import DuplicateKeyError
from pymongo.cursor import Cursor

db = conn["Users"]
collection = db["users"]
collection.create_index([("username", 1), ("email", 1)], unique=True)


class UserIn(BaseModel):
    username: str
    email: str
    password: str
    hangouts: Optional[Dict[str, bool]]


class UserOut(BaseModel):
    id: Optional[int]
    username: str
    email: str
    hangouts: Optional[Dict[str, bool]]


class UpdateUserModel(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]
    hangouts: Optional[Dict[str, bool]]


class DuplicateUserError(Exception):
    pass


class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepo:
    def get_all_users(self) -> Cursor:
        try:
            return collection.find()
        except Exception:
            raise Exception("There was an error when finding all users")

    def create_user(self, user: UserIn, hashed_password: str) -> UserOutWithPassword:
        inserted_user = user.dict()
        inserted_user["hashed_password"] = hashed_password
        try:
            collection.insert_one(inserted_user)
            return UserOutWithPassword(**inserted_user)
        except DuplicateKeyError:
            raise DuplicateUserError()
        except Exception:
            raise Exception("There was an error when creating a user")

    def get_one_user(self, username: str) -> Optional[UserOutWithPassword]:
        try:
            user = collection.find_one({"username": username})
            if user:
                user["hashed_password"] = user.get("hashed_password", "")
                return UserOutWithPassword(**user)
            else:
                raise HTTPException(status_code=404, detail="User not found")
        except Exception:
            raise Exception("There was an error when getting a user")

    def update_user(self, username: str, user: UpdateUserModel) -> Optional[UserOut]:
        existing_user = self.get_one_user(username)
        if existing_user:
            updated_data = user.dict(exclude_unset=True)
            updated_user = existing_user.copy(update=updated_data)
            updated_document = updated_user.dict()
            try:
                collection.replace_one({"username": username}, updated_document)
                return updated_user
            except DuplicateKeyError:
                raise DuplicateUserError()
            except Exception:
                raise Exception("There was an error when updating a user")
        return None

    def delete_user(self, username: str) -> Optional[UserOut]:
        user = self.get_one_user(username)
        if user is None:
            return None
        try:
            collection.delete_one({"username": username})
            return user
        except Exception:
            raise Exception("There was an error when deleting a user")

    def user_hangouts(self, username: str, name: str):
        existing_user = self.get_one_user(username)
        if existing_user:
            updated_hangouts = existing_user.hangouts.copy()
            if name in updated_hangouts:
                del updated_hangouts[name]
            updated_hangouts[name] = True
            updated_user = existing_user.copy(update={"hangouts": updated_hangouts})
            document = updated_user.dict()
            try:
                collection.replace_one({"username": username}, document)
                return updated_user
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
        return None

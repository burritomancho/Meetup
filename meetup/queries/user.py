from fastapi import HTTPException
from pydantic import BaseModel
from queries.pool import conn
from typing import Optional
from pymongo.errors import DuplicateKeyError
from pymongo.cursor import Cursor

db = conn["Users"]
collection = db["users"]

collection.create_index("email", unique=True)


class UserIn(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]


class UserOut(BaseModel):
    id: Optional[int]
    username: str
    email: str


class UpdateUserModel(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]


class DuplicateUserError(Exception):
    pass


class UserRepo:
    def get_all_users(self) -> Cursor:
        try:
            return collection.find()
        except Exception:
            raise Exception("There was an error when finding all users")

    def create_user(self, user: UserIn) -> UserOut:
        inserted_user = user.dict()
        try:
            collection.insert_one(inserted_user)
            return UserOut(**inserted_user)
        except DuplicateKeyError:
            raise DuplicateUserError()
        except Exception:
            raise Exception("There was an error when creating a user")

    def get_one_user(self, email: str) -> UserOut:
        try:
            user = collection.find_one({"email": email})
            if user:
                return UserOut(**user)
            else:
                raise HTTPException(status_code=404, detail="User not found")
        except Exception:
            raise Exception("There was an error when getting a user")

    def update_user(self, email: str, user: UpdateUserModel) -> Optional[UserOut]:
        existing_user = self.get_one_user(email)
        if existing_user:
            # Get the updated data from the UpdateUserModel, excluding unset attributes
            updated_data = user.dict(exclude_unset=True)
            # Create a new instance of UserOut with the updated data
            updated_user = existing_user.copy(update=updated_data)
            # Convert the updated user instance to a dictionary
            updated_document = updated_user.dict()
            try:
                # Update the document in the database with the new data
                collection.replace_one({"email": email}, updated_document)
                # Return the updated user instance
                return updated_user
            except DuplicateKeyError:
                # Raise an exception if a user with the updated email already exists
                raise DuplicateUserError()
            except Exception:
                # Raise a generic exception if there was an error during the update
                raise Exception("There was an error when updating a user")
        # Return None if the existing user was not found
        return None

    def delete_user(self, email: str) -> Optional[UserOut]:
        # Find the user with the specified email
        user = self.get_one_user(email)
        if user is None:
            return None
        try:
            # Delete the user from the database
            collection.delete_one({"email": email})
            return user
        except Exception:
            raise Exception("There was an error when deleting a user")

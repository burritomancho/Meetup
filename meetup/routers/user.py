from fastapi import APIRouter, HTTPException
from queries.user import UserIn, UserOut, UserRepo, DuplicateUserError
from pydantic import BaseModel
from typing import Optional

router = APIRouter()
user_repo = UserRepo()


class AccountForm(BaseModel):
    username: str
    password: str


class UpdateUserModel(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]


@router.get("/users")
async def get_all_users():
    try:
        users = user_repo.get_all_users()
        return [UserOut(**user) for user in users]
    except Exception:
        raise HTTPException(status_code=500, detail="Unexpected error")


@router.post("/users")
async def create_user(user: UserIn) -> UserOut:
    try:
        created_user = user_repo.create_user(user)
    except DuplicateUserError:
        raise HTTPException(
            status_code=409, detail="User with this email already exists"
        )
    return created_user


@router.get("/users/{email}")
async def get_one_user(email: str):
    try:
        user = user_repo.get_one_user(email)
        return user
    except Exception:
        raise HTTPException(status_code=500, detail="Unexpected error")


@router.put("/users/{email}")
async def update_user(email: str, user: UpdateUserModel) -> UserOut:
    try:
        updated_user = user_repo.update_user(email, user)
        if updated_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return updated_user
    except DuplicateUserError:
        raise HTTPException(
            status_code=409, detail="User with this email already exists"
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to update user")


@router.delete("/users/{email}")
async def delete_user(email: str) -> UserOut:
    deleted_user = user_repo.delete_user(email)
    if deleted_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Successfully deleted user"}

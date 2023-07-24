from fastapi import APIRouter, HTTPException, Depends, Request, Response
from queries.user import UserIn, UserOut, UserRepo, DuplicateUserError
from pydantic import BaseModel
from typing import Optional, List, Dict
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

router = APIRouter()
user_repo = UserRepo()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserOut


class UpdateUserModel(BaseModel):
    username: Optional[str]
    email: Optional[str]
    password: Optional[str]
    hangouts: Optional[Dict[str, bool]]
    friends: Optional[List[str]]


@router.get("/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": user,
        }


@router.get("/users", response_model=List[UserOut])
async def get_all_users() -> List[UserOut]:
    try:
        users = user_repo.get_all_users()
        return [UserOut(**user) for user in users]
    except Exception:
        raise HTTPException(status_code=500, detail="Unexpected error")


@router.post("/users", response_model=AccountToken)
async def create_user(
    user: UserIn,
    request: Request,
    response: Response,
    repo: UserRepo = Depends(),
):
    hashed_password = authenticator.hash_password(user.password)
    try:
        created_user = user_repo.create_user(user, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=409, detail="User with this email or username already exists"
        )
    form = AccountForm(username=user.username, password=user.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=created_user, **token.dict())


@router.get("/users/{username}", response_model=Optional[UserOut])
async def get_one_user(
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    user = user_repo.get_one_user(username)
    return user


@router.put("/users/{username}")
async def update_user(
    username: str,
    user: UpdateUserModel,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    try:
        updated_user = user_repo.update_user(username, user)
        if updated_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return updated_user
    except DuplicateUserError:
        raise HTTPException(
            status_code=409, detail="User with this email or username already exists"
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to update user")


@router.delete("/users/{username}", response_model=bool)
async def delete_user(
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    deleted_user = user_repo.delete_user(username)
    if deleted_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Successfully deleted user"}


@router.delete("/users/{username}/{name}")
async def delete_user_hangout(
    username: str,
    name: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    deleted_user_hangout = user_repo.delete_user_hangout(username, name)
    if deleted_user_hangout is None:
        raise HTTPException(status_code=404, detail="User hangout not found")
    return {"message": "Successfully deleted user hangout"}

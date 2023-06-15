from fastapi import APIRouter, HTTPException, Depends
from queries.hangout import (
    HangoutIn,
    HangoutOut,
    HangoutRepo,
)
from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from authenticator import authenticator

router = APIRouter()
hangout_repo = HangoutRepo()

class Friend(BaseModel):
    username: str
    selected_date: date


class UpdateHangoutModel(BaseModel):
    location: Optional[str]
    friends: Optional[List[Friend]]
    dates: Optional[List[date]]
    finalized_date: Optional[date]
    name: Optional[str]
    description: Optional[str]


@router.get("/hangouts")
async def get_all_hangouts(account_data: dict = Depends(authenticator.get_current_account_data)):
    hangouts = hangout_repo.get_all_hangouts()
    return [
        HangoutOut(**hangout)
        for hangout in hangouts
        if hangout is not None
    ]


@router.post("/hangouts")
async def create_hangout(
    hangout: HangoutIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> HangoutOut:
    created_hangout = hangout_repo.create_hangout(hangout)
    return created_hangout


@router.get("/hangouts/{hangout_name}/users")
async def get_users_in_hangout(
    hangout_name: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    users = hangout_repo.get_users_in_hangout(hangout_name)
    return users


@router.get("/users/{username}/hangouts")
async def get_current_user_hangouts(
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    hangout = hangout_repo.get_current_user_hangouts(username)
    return hangout


@router.put("/hangouts/{name}")
async def update_hangout(
    name: str,
    hangout_update: UpdateHangoutModel,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    hangout = hangout_repo.update_hangout(name, hangout_update)
    return hangout


@router.get("/hangouts/{name}")
async def get_one_hangout(
    name: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    hangout = hangout_repo.get_one_hangout(name)
    return hangout


@router.delete("/hangouts/{name}")
async def delete_hangout(
    name: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    deleted_hangout = hangout_repo.delete_hangout(name)
    if deleted_hangout is None:
        raise HTTPException(status_code=404, detail="Hangout not found")
    return {"message": "Hangout deleted successfully"}

from fastapi import APIRouter, HTTPException
from queries.hangout import (
    HangoutIn,
    HangoutOut,
    HangoutRepo,
    DuplicateHangoutName,
)
from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime

router = APIRouter()
hangout_repo = HangoutRepo()


class UpdateHangoutModel(BaseModel):
    location: Optional[str]
    friends: Optional[List[str]]
    days: Optional[date]
    name: Optional[str]
    notes: Optional[str]


@router.get("/hangouts")
async def get_all_hangouts():
    try:
        hangouts = hangout_repo.get_all_hangouts()
        return [
            HangoutOut(**hangout)
            for hangout in hangouts
            if hangout is not None
        ]
    except Exception:
        raise HTTPException(status_code=500, detail="Unexpected error")


@router.post("/hangouts")
async def create_hangout(hangout: HangoutIn) -> HangoutOut:
    try:
        created_hangout = hangout_repo.create_hangout(hangout)
    except DuplicateHangoutName:
        raise HTTPException(
            status_code=409, detail="Hangout with this name already exists"
        )
    return created_hangout


@router.get("/hangouts/{hangout_name}/users", response_model=List[str])
async def get_users_in_hangout(hangout_name: str):
    try:
        users = hangout_repo.get_users_in_hangout(hangout_name)
        return users
    except Exception:
        raise HTTPException(status_code=500, detail="Unexpected error")


@router.get("/hangouts/{name}")
async def get_one_hangout(name: str):
    try:
        hangout = hangout_repo.get_one_hangout(name)
        return hangout
    except Exception:
        raise HTTPException(status_code=500, detail="Unexpected error")


@router.put("/hangouts/{name}")
async def update_hangout(name: str, hangout: UpdateHangoutModel) -> HangoutOut:
    try:
        updated_hangout = hangout_repo.update_hangout(name, hangout)
        if updated_hangout is None:
            raise HTTPException(status_code=404, detail="Hangout not found")
        return updated_hangout
    except DuplicateHangoutName:
        raise HTTPException(
            status_code=409, detail="Hangout with this name already exists"
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to update hangout")


@router.delete("/hangouts/{name}")
async def delete_hangout(name: str):
    deleted_hangout = hangout_repo.delete_hangout(name)
    if deleted_hangout is None:
        raise HTTPException(status_code=404, detail="Hangout not found")
    return {"message": "Hangout deleted successfully"}

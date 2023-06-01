from fastapi import APIRouter, HTTPException, Depends
from queries.calendar import CalendarIn, CalendarOut, CalendarRepo, DuplicateCalendarError
from pydantic import BaseModel
from typing import Optional
from authenticator import authenticator

router = APIRouter()
calendar_repo = CalendarRepo()


@router.get("/calendars")
async def get_all_calendar(account_data: dict = Depends(authenticator.get_current_account_data)):
    try:
        calendars = calendar_repo.get_all_calendars()
        return [CalendarOut(**calendar) for calendar in calendars]
    except Exception:
        raise HTTPException(status_code=500, detail="Unexpected error")


@router.post("/calendars")
async def create_calendar(calendar: CalendarIn, hangout_id: int, calendar_id: int, account_data: dict = Depends(authenticator.get_current_account_data)) -> CalendarOut:
    try:
        new_calendar = calendar_repo.create_calendar(calendar, hangout_id, calendar_id)
    except DuplicateCalendarError:
        raise HTTPException(
            status_code=409, detail="Calendar with this id already exists"
        )
    return new_calendar


@router.get("/calendars/{calendar_id}")
async def get_one_calendar(calendar_id: int, account_data: dict = Depends(authenticator.get_current_account_data)):
    try:
        calendar = calendar_repo.get_one_calendar(calendar_id)
        if calendar:
            return calendar
        raise HTTPException(status_code=409, detail="Calendar does not exist")
    except Exception:
        raise HTTPException(status_code=500, detail="Unexpected error")


@router.put("/calendars/{calendar_id}")
async def update_calendar(calendar_id: int, calendar: CalendarIn, account_data: dict = Depends(authenticator.get_current_account_data)) -> CalendarOut:
    try:
        updated_calendar = calendar_repo.update_calendar(calendar_id, calendar)
        if updated_calendar is None:
            raise HTTPException(status_code=404, detail="Calendar not found")
        return updated_calendar
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to update calendar")


@router.delete("/calendars/{calendar_id}")
async def delete_calendar(calendar_id: int, account_data: dict = Depends(authenticator.get_current_account_data)) -> CalendarOut:
    deleted_calendar = calendar_repo.delete_calendar(calendar_id)
    if deleted_calendar is None:
        raise HTTPException(status_code=404, detail="Calendar not found")
    return {"message": "Successfully deleted calendar"}

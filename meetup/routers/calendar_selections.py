# from fastapi import APIRouter, HTTPException
# from queries.calendar_ import CalendarIn, CalendarOut, CalendarRepo
# from pydantic import BaseModel
# from typing import Optional

# router = APIRouter()
# calendar_selections_repo = CalendarSelectionsRepo()


# @router.get("/calendars")
# async def get_all_calendar_selections(calendar_id: int):
#     try:
#         calendar_selections = calendar_selections_repo.get_all_calendar_selections()
#         return [CalendarOut(**calendar) for calendar in calendars]
#     except Exception:
#         raise HTTPException(status_code=500, detail="Unexpected error")


# @router.post("/calendars")
# async def create_user(user: UserIn) -> UserOut:
#     try:
#         created_user = user_repo.create_user(user)
#     except DuplicateUserError:
#         raise HTTPException(
#             status_code=409, detail="User with this email already exists"
#         )
#     return created_user


# @router.get("/calendars/{calendar_id}")
# async def get_one_calendar(calendar_id: int):
#     try:
#         calendar = calendar_repo.get_one_calendar(calendar_id)
#         return calendar
#     except Exception:
#         raise HTTPException(status_code=500, detail="Unexpected error")


# @router.put("/calendars/{calendar_id}")
# async def update_calendar(calendar_id: int, calendar: CalendarIn) -> CalendarOut:
#     try:
#         updated_calendar = calendar_repo.update_calendar(calendar_id, calendar)
#         if updated_calendar is None:
#             raise HTTPException(status_code=404, detail="Calendar not found")
#         return updated_calendar
#     except Exception:
#         raise HTTPException(status_code=500, detail="Failed to update calendar")


# @router.delete("/calendars/{calendar_id}")
# async def delete_calendar(calendar_id: int) -> CalendarOut:
#     deleted_calendar = calendar_repo.delete_calendar(calendar_id)
#     if deleted_calendar is None:
#         raise HTTPException(status_code=404, detail="Calendar not found")
#     return {"message": "Successfully deleted calendar"}

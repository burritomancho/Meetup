from fastapi import HTTPException
from pydantic import BaseModel
from queries.pool import conn
from typing import Optional, List
from pymongo.errors import DuplicateKeyError
from pymongo.cursor import Cursor


db = conn["Calendars"]
collection = db["calendars"]

collection.create_index("calendar_id", unique=True)


class CalendarIn(BaseModel):
    year: int
    month: str
    days: List[int]


class CalendarOut(BaseModel):
    calendar_id: int
    hangout_id: int
    year: int
    month: str
    days: List[int]


class DuplicateCalendarError(Exception):
    pass


class CalendarRepo:
    def get_all_calendars(self) -> Cursor:
        try:
            return collection.find()
        except Exception:
            raise Exception("There was an error when getting all calendars")

    def get_one_calendar(self, calendar_id: int) -> CalendarOut:
        try:
            calendar = collection.find_one({"calendar_id": calendar_id})
            if calendar:
                return CalendarOut(**calendar)
            else:
                raise HTTPException(status_code=404, detail="Calendar not found")
        except Exception:
            raise Exception("There was an error when getting a calendar")

    def create_calendar(self, calendar: CalendarIn, hangout_id: int, calendar_id: int) -> CalendarOut:
            new_calendar = CalendarOut(
                calendar_id=calendar_id,
                hangout_id=hangout_id,
                year=calendar.year,
                month=calendar.month,
                days=calendar.days
            )
            calendar_dict = new_calendar.dict()
            try:
                collection.insert_one(calendar_dict)
                return new_calendar
            except DuplicateKeyError:
                raise DuplicateKeyError()
            except Exception:
                raise Exception("There was an error when creating a calendar")

    def update_calendar(self, calendar_id: int, calendar: CalendarIn) -> Optional[CalendarOut]:
        try:
            parameter = {"calendar_id": calendar_id}
            update = {"$set": calendar.dict()}
            result = collection.update_one(parameter, update)

            if result.matched_count == 0:
                raise HTTPException(status_code=404, detail="Calendar not found")

            updated_calendar = collection.find_one(parameter)
            return CalendarOut(**updated_calendar)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    def delete_calendar(self, calendar_id: int):
        try:
            collection.delete_one({"calendar_id": calendar_id})
            return ("Sucessfully deleted calendar")
        except Exception:
            raise Exception("There was an error when deleting a calendar")

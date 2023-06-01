from fastapi import HTTPException
from pydantic import BaseModel
from queries.pool import conn
from typing import Optional, List
from pymongo.errors import DuplicateKeyError
from pymongo.cursor import Cursor


db = conn["Calendars"]
collection = db["calendar_selections"]


class CalendarSelections(BaseModel):
    calendar_id: int
    user_email: str
    calendar_dates: List[int]

class DuplicateCalendarError(Exception):
    pass

collection.create_index("calendar_selections_id", unique=True)


class CalendarRepo:
    def get_all_calendar_selections(self, calendar_id: int) -> Cursor:
        try:
            calendar_selections = collection.find({"calendar_id": calendar_id})
            if not calendar_selections:
                return ("Calendar does not exist")
            return calendar_selections
        except Exception:
            raise Exception("There was an error when getting all calendar selections")

    def get_one_calendar_selections(self, calendar_id: int, calendar_selections_id: int) -> CalendarSelections:
        try:
            calendar_selections = collection.find_one({"$and": [{"calendar_selections_id": calendar_selections_id}, {"calendar_id": calendar_id}]})
            if calendar:
                return CalendarSelections(**calendar_selections)
            else:
                raise HTTPException(status_code=404, detail="Calendar or calendar selections not found")
        except Exception:
            raise Exception("There was an error when getting a calendar selection")

    # def create_calendar(self, calendar: CalendarIn, hangout_id: int, calendar_id: int) -> CalendarOut:
    #         new_calendar = CalendarOut(
    #             calendar_id=calendar_id,
    #             hangout_id=hangout_id,
    #             year=calendar.year,
    #             month=calendar.month,
    #             days=calendar.days
    #         )
    #         try:
    #             collection.insert_one(new_calendar)
    #             return CalendarOut(**new_calendar)
    #         except DuplicateKeyError:
    #             raise DuplicateKeyError()
    #         except Exception:
    #             raise Exception("There was an error when creating a calendar")

    # def update_calendar(self, calendar_id: int, calendar: CalendarIn) -> Optional[CalendarOut]:
    #     try:
    #         parameter = {"calendar_id": calendar_id}
    #         update = {"$set": calendar}
    #         result = collection.update_one(parameter, update)

    #         if result.matched_count == 0:
    #             raise HTTPException(status_code=404, detail="Calendar not found")

    #         updated_calendar = collection.find_one(parameter)
    #         return CalendarOut(**updated_calendar)
    #     except Exception as e:
    #         raise HTTPException(status_code=500, detail=str(e))

    # def delete_calendar(self, calendar_id: int):
    #     try:
    #         collection.delete_one({"calendar_id": calendar_id})
    #         return ("Sucessfully deleted calendar")
    #     except Exception:
    #         raise Exception("There was an error when deleting a calendar")

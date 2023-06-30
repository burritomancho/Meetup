from fastapi import APIRouter, HTTPException, Depends
from queries.yelp import (
    YelpCalls
)
from authenticator import authenticator

router = APIRouter()

@router.get("/api/yelp_locations")
async def get_yelp_locations(
    city: str,
    term: str,
    repo: YelpCalls = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        yelp = repo.get_location_list(city, term)
        return yelp
    except Exception:
        print(Exception)
        raise HTTPException(status_code=500, detail="Unexpected error")

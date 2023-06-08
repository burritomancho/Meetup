from fastapi import APIRouter, HTTPException, Depends
from queries.yelp import (
    YelpCalls
)
from authenticator import authenticator

router = APIRouter()

@router.get("/api/yelp_image")
async def get_yelp_image(
    location: str,
    repo: YelpCalls = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        yelp = repo.get_single_location(location)
        return yelp
    except Exception:
        print(Exception)
        raise HTTPException(status_code=500, detail="Unexpected error")

@router.get("/api/yelp_locations")
async def get_yelp_locations(
    city: str,
    state: str,
    repo: YelpCalls = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        yelp = repo.get_location_list(city, state)
        return yelp
    except Exception:
        print(Exception)
        raise HTTPException(status_code=500, detail="Unexpected error")

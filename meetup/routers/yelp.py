from fastapi import APIRouter, HTTPException, Depends
from queries.yelp import (
    YelpCalls
)
# from authenticator import authenticator

router = APIRouter()

@router.get("/api/yelp_locations")
async def get_yelp_locations(
    city: str,
    term: str,
    repo: YelpCalls = Depends(),
):
    yelp = repo.get_location_list(city, term)
    return yelp
    print(e)
    raise HTTPException(status_code=500, detail="Unexpected error")

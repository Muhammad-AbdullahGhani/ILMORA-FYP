from fastapi import APIRouter, HTTPException
from typing import List

# Import controller + models
from src.controllers import rec_Controller
from src.controllers.rec_Controller import (
    RecommendationRequest,
    DegreeMatch
)

router = APIRouter(
    prefix="/api/recommend",
    tags=["Recommendation"]
)

@router.post("/degrees", response_model=List[DegreeMatch])
def recommend_degrees(payload: RecommendationRequest):
    """
    Takes RIASEC scores + student background.
    Returns top predicted degrees using trained Random Forest model.
    """

    try:
        recommendations = rec_Controller.get_recommendations(payload)

        if recommendations is None or len(recommendations) == 0:
            raise HTTPException(
                status_code=404,
                detail="No degree recommendations available. Model may not be loaded or no matching degrees found."
            )

        return recommendations

    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        # Log the full error for debugging
        import traceback
        error_detail = f"Internal error: {str(e)}"
        print(f"ERROR in recommend_degrees: {error_detail}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=error_detail
        )

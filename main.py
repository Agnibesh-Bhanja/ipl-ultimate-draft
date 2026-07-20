from fastapi import FastAPI
from draft import load_cards
from recommendation import recommend_players
from team_rating import squad_summary
from engine import DraftEngine
from fastapi.middleware.cors import CORSMiddleware
from leaderboard import submit_score, top10

app = FastAPI(
    title="IPL Ultimate Draft API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
        "https://ipl-ultimate-draft-xavb-nine.vercel.app",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cards = load_cards()
draft = DraftEngine(cards)


@app.get("/")
def home():

    return {
        "message": "IPL Ultimate Draft API Running 🚀"
    }


@app.get("/cards")
def get_cards():

    return cards.to_dict(orient="records")

@app.get("/recommend")
def recommend():

    recommendations = draft.recommendations()

    return recommendations.to_dict(
        orient="records"
    )

@app.post("/pick/{card_id}")
def pick(card_id: int):

    success = draft.pick(card_id)

    return {
        "success": success,
        "team": draft.team().to_dict(orient="records"),
        "recommendations": draft.recommendations().to_dict(orient="records"),
        "summary": draft.summary()
    }

@app.get("/summary")
def summary():

    return draft.summary()

@app.post("/reset")
def reset():

    draft.reset()

    return {"success": True}

from pydantic import BaseModel


class ScoreInput(BaseModel):

    name:str

    overall:int

    chemistry:int

    draft_score:int


@app.post("/submit-score")

def save_score(data:ScoreInput):

    submit_score(

        data.name,

        data.overall,

        data.chemistry,

        data.draft_score

    )

    return {"success":True}


@app.get("/leaderboard")

def leaderboard():

    return top10()
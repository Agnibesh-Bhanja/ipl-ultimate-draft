"""
Recommendation Engine
"""

import random
import pandas as pd

from draft import roles_needed
from chemistry import player_chemistry
from scoring import recommendation_score
from config import (
    STARTING_XI,
    RECOMMENDATION_COUNT,
    RARITY_CHANCE
)


def recommend_players(team_ids, cards):

    # --------------------------------------------------
    # Remove already selected cards
    # --------------------------------------------------

    available = cards[
        ~cards["CardID"].isin(team_ids)
    ].copy()

    # --------------------------------------------------
    # Position Locking
    # --------------------------------------------------

    if len(team_ids) < STARTING_XI:

        needed = roles_needed(team_ids, cards)

        available = available[
            available["Role"].isin(needed)
        ]

    # --------------------------------------------------
    # Rarity Filter
    # --------------------------------------------------

    candidate_rows = []

    for _, player in available.iterrows():

        chance = RARITY_CHANCE.get(
            player["CardType"],
            1.0
        )

        if random.random() <= chance:

            candidate_rows.append(player)

    # Safety fallback
    if len(candidate_rows) < 40:
        candidate_rows = list(
            available.to_dict("records")
        )

    candidates = pd.DataFrame(candidate_rows)

    # --------------------------------------------------
    # Recommendation Score
    # --------------------------------------------------

    scores = []

    team = cards[
        cards["CardID"].isin(team_ids)
    ]

    for _, player in candidates.iterrows():

        chem = player_chemistry(
            player,
            team,
            cards
        )

        score = recommendation_score(
            player,
            chem
        )

        scores.append(score)

    candidates["RecommendationScore"] = scores

    # --------------------------------------------------
    # Keep only Top 40
    # --------------------------------------------------

    candidates = candidates.sort_values(
        "RecommendationScore",
        ascending=False
    )

    candidates = candidates.head(40)

    # --------------------------------------------------
    # Weighted Sampling
    # --------------------------------------------------

    weights = candidates[
        "RecommendationScore"
    ].tolist()

    recommendations = candidates.sample(
        n=min(RECOMMENDATION_COUNT, len(candidates)),
        weights=weights,
        replace=False
    )

    recommendations = recommendations.sort_values(
        "RecommendationScore",
        ascending=False
    )

    return recommendations.reset_index(drop=True)
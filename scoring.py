"""
Scoring Engine
"""

import random

from config import (
    OVR_WEIGHT,
    CHEMISTRY_WEIGHT,
    LUCK_WEIGHT,
    LUCK_MIN,
    LUCK_MAX
)


def normalize_chemistry(chem):
    """
    Convert chemistry (0-3)
    to percentage (0-100)
    """

    return (chem / 3) * 100


def recommendation_score(player, chemistry):
    """
    Final recommendation score.

    Score =
        60% OVR
        25% Chemistry
        15% Luck
    """

    ovr = player["OVR"]

    chem = normalize_chemistry(chemistry)

    luck = random.uniform(LUCK_MIN, LUCK_MAX)

    score = (
        ovr * OVR_WEIGHT +
        chem * CHEMISTRY_WEIGHT +
        luck * LUCK_WEIGHT
    )

    return round(score, 2)
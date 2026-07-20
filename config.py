"""
Global configuration for IPL Ultimate Draft
"""

# ---------------- FORMATION ---------------- #

FORMATION = {
    "Batsman": 5,
    "All-Rounder": 2,
    "Bowler": 4
}

STARTING_XI = 11
BENCH_SIZE = 4
TOTAL_SQUAD = STARTING_XI + BENCH_SIZE


# ---------------- RECOMMENDATION SCORING ---------------- #

# Recommendation Formula
OVR_WEIGHT = 0.60
CHEMISTRY_WEIGHT = 0.25
LUCK_WEIGHT = 0.15

# Luck (0-100)
LUCK_MIN = 0
LUCK_MAX = 100

# Appearance probability
RARITY_CHANCE = {
    "Season": 1.00,   # Always eligible
    "Legacy": 0.45,   # 45% chance
    "Icon": 0.20      # 20% chance
}


# ---------------- RECOMMENDATION ---------------- #

# Number of players shown each pick
RECOMMENDATION_COUNT = 5

# Tier sizes
ELITE_SIZE = 10
GREAT_SIZE = 20
GOOD_SIZE = 30

# Draft patterns
DRAFT_PATTERNS = [
    (2, 2, 1),   # 70%
    (1, 3, 1),   # 20%
    (1, 2, 2)    # 10%
]

PATTERN_WEIGHTS = [70, 20, 10]


# ---------------- CHEMISTRY ---------------- #

MAX_PLAYER_CHEMISTRY = 3
MAX_TEAM_CHEMISTRY = 33
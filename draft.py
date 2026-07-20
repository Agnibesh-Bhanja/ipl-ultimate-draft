"""
Draft utilities
"""

import pandas as pd
from collections import Counter
from config import FORMATION


def load_cards(path="data/cards.csv"):
    """
    Load cards dataset.
    """
    return pd.read_csv(path)


def squad_counts(team_ids, cards):
    """
    Count roles currently selected.
    """

    team = cards[cards["CardID"].isin(team_ids)]

    counts = Counter(team["Role"])

    # Ensure every role exists
    for role in FORMATION.keys():
        counts.setdefault(role, 0)

    return counts


def roles_needed(team_ids, cards):
    """
    Return roles still required for the Starting XI.
    """

    counts = squad_counts(team_ids, cards)

    needed = []

    for role, limit in FORMATION.items():

        if counts[role] < limit:
            needed.append(role)

    return needed


def starting_xi_complete(team_ids):
    """
    Check if Starting XI is complete.
    """

    return len(team_ids) >= 11


def bench_phase(team_ids):
    """
    Returns True once XI is completed.
    """

    return len(team_ids) >= 11
"""
Team Rating Engine
"""

from chemistry import team_chemistry


def team_overall(team):

    if team.empty:
        return 0

    return round(team["OVR"].mean())


def draft_score(overall, chemistry):
    """
    FIFA-style Draft Score

    Example:
    OVR = 92
    Chemistry = 31

    Draft Score = 123
    """
    return overall + chemistry


def squad_summary(team_ids, cards):

    if len(team_ids) == 0:

        return {
            "Overall": 0,
            "Chemistry": 0,
            "DraftScore": 0,
        }

    team = cards[cards["CardID"].isin(team_ids)]

    overall = team_overall(team)

    chemistry = team_chemistry(team_ids, cards)

    draft = draft_score(overall, chemistry)

    return {
        "Overall": overall,
        "Chemistry": chemistry,
        "DraftScore": draft,
    }
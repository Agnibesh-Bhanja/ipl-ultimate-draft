"""
Chemistry Engine
"""

MAX_PLAYER_CHEM = 3
MAX_TEAM_CHEM = 33


def player_chemistry(player, team, cards=None):

    chem = 0

    if len(team) == 0:
        return 0

    # Same IPL Team
    teammates = len(
        team[team["Team"] == player["Team"]]
    )

    if teammates >= 2:
        chem += 2
    elif teammates == 1:
        chem += 1

    # Same Card Type
    same_card = len(
        team[team["CardType"] == player["CardType"]]
    )

    if same_card >= 2:
        chem += 1

    return min(chem, MAX_PLAYER_CHEM)


def team_chemistry(team_ids, cards):

    if len(team_ids) == 0:
        return 0

    team = cards[
        cards["CardID"].isin(team_ids)
    ]

    total = 0

    for _, player in team.iterrows():

        total += player_chemistry(
            player,
            team,
            cards
        )

    return min(total, MAX_TEAM_CHEM)
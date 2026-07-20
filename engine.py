"""
Draft Engine
"""

from recommendation import recommend_players
from team_rating import squad_summary


class DraftEngine:

    def __init__(self, cards):

        self.cards = cards

        self.team_ids = []

    def recommendations(self):

        return recommend_players(
            self.team_ids,
            self.cards
        )

    def pick(self, card_id):

        if len(self.team_ids) >= 11:
            return False

        if card_id in self.team_ids:
            return False

        self.team_ids.append(card_id)

        return True

    def team(self):

        return self.cards[
            self.cards["CardID"].isin(self.team_ids)
        ]

    def summary(self):

        return squad_summary(
            self.team_ids,
            self.cards
        )

    def reset(self):

        self.team_ids = []
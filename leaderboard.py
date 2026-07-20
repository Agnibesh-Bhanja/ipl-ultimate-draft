import sqlite3


DB_NAME = "leaderboard.db"


def create_table():

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS leaderboard (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT UNIQUE,

        overall INTEGER,

        chemistry INTEGER,

        draft_score INTEGER

    )
    """)

    conn.commit()
    conn.close()


create_table()


def submit_score(name, overall, chemistry, draft_score):

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    existing = cursor.execute(

        """
        SELECT draft_score
        FROM leaderboard
        WHERE name=?
        """,

        (name,)

    ).fetchone()

    if existing:

        if draft_score > existing[0]:

            cursor.execute(

                """
                UPDATE leaderboard

                SET overall=?,
                    chemistry=?,
                    draft_score=?

                WHERE name=?
                """,

                (
                    overall,
                    chemistry,
                    draft_score,
                    name
                )

            )

    else:

        cursor.execute(

            """
            INSERT INTO leaderboard

            (name, overall, chemistry, draft_score)

            VALUES (?, ?, ?, ?)
            """,

            (
                name,
                overall,
                chemistry,
                draft_score
            )

        )

    conn.commit()
    conn.close()


def top10():

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute(

        """
        SELECT

            name,
            draft_score,
            overall,
            chemistry

        FROM leaderboard

        ORDER BY draft_score DESC

        LIMIT 10
        """

    )

    rows = cursor.fetchall()

    conn.close()

    return [

        {

            "name": row[0],

            "score": row[1],

            "overall": row[2],

            "chemistry": row[3]

        }

        for row in rows

    ]
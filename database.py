import sqlite3

conn = sqlite3.connect("leaderboard.db", check_same_thread=False)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS leaderboard(

id INTEGER PRIMARY KEY AUTOINCREMENT,

name TEXT,

score INTEGER,

overall INTEGER,

chemistry INTEGER

)
""")

conn.commit()
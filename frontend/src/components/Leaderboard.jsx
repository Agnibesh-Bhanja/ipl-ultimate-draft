import "./Leaderboard.css";
import { useEffect, useState } from "react";
import api from "../api/api";

function Leaderboard() {

    const [leaders, setLeaders] = useState([]);

    useEffect(() => {

        loadLeaderboard();

    }, []);

    async function loadLeaderboard() {

        const res = await api.get("/leaderboard");

        setLeaders(res.data);

    }

    return (

        <div className="leaderboard">

            <h2>🏆 TOP 10 DRAFTS</h2>

            {

                leaders.length === 0 ?

                <p style={{ textAlign: "center" }}>

                    No Drafts Yet

                </p>

                :

                leaders.map((player, index) => (

                    <div

                        key={index}

                        className="leader-row"

                    >

                        <span className="leader-rank">

                            #{index + 1}

                        </span>

                        <span className="leader-name">

                            {player.name}

                        </span>

                        <span className="leader-score">

                            {player.score}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}

export default Leaderboard;
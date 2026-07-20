import "./Scoreboard.css";

function Scoreboard({ summary }) {

    const ovrPercent = (summary.Overall / 99) * 100;
    const chemPercent = (summary.Chemistry / 33) * 100;
    const draftPercent = (summary.DraftScore / 132) * 100;

    return (

        <div className="scoreboard">

            <ScoreCard
                title="OVR"
                value={summary.Overall}
                percent={ovrPercent}
            />

            <ScoreCard
                title="CHEM"
                value={summary.Chemistry}
                percent={chemPercent}
            />

            <ScoreCard
                title="DRAFT"
                value={summary.DraftScore}
                percent={draftPercent}
            />

        </div>

    );

}

function ScoreCard({ title, value, percent }) {

    return (

        <div className="score-card">

            <div className="score-title">

                {title}

            </div>

            <div className="score-value">

                {value}

            </div>

            <div className="progress">

                <div

                    className="progress-fill"

                    style={{

                        width: `${percent}%`

                    }}

                />

            </div>

        </div>

    );

}

export default Scoreboard;
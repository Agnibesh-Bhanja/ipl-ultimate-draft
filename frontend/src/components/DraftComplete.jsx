import "./DraftComplete.css";
import { useState } from "react";
import api from "../api/api";

function DraftComplete({

    summary,

    onReset,

    onSubmitSuccess

}) {

    const [name,setName]=useState("");

    const [submitted,setSubmitted]=useState(false);

async function submitScore() {

    if (name.trim() === "") return;

    await api.post("/submit-score", {

        name,

        overall: summary.Overall,

        chemistry: summary.Chemistry,

        draft_score: summary.DraftScore

    });

    setSubmitted(true);

    // Refresh the leaderboard
    if (onSubmitSuccess) {
    onSubmitSuccess();
}

}

    let grade="C";

    if(summary.DraftScore>=120) grade="S";
    else if(summary.DraftScore>=115) grade="A";
    else if(summary.DraftScore>=105) grade="B";

    return(

        <div className="draft-finish">

            <h1>🏆 Draft Complete</h1>

            <div className="finish-stats">

                <div>

                    <h2>{summary.Overall}</h2>

                    <span>Overall</span>

                </div>

                <div>

                    <h2>{summary.Chemistry}</h2>

                    <span>Chemistry</span>

                </div>

                <div>

                    <h2>{summary.DraftScore}</h2>

                    <span>Draft Score</span>

                </div>

            </div>

            <h2 className="finish-grade">

                Grade {grade}

            </h2>

            {

                !submitted ?

                <>

                    <input

                        className="leader-input"

                        placeholder="Enter Your Name"

                        value={name}

                        onChange={(e)=>setName(e.target.value)}

                    />

                    <button

                        className="new-draft-btn"

                        onClick={submitScore}

                    >

                        Submit Score

                    </button>

                </>

                :

                <button

                    className="new-draft-btn"

                    onClick={onReset}

                >

                    Start New Draft

                </button>

            }

        </div>

    )

}

export default DraftComplete;
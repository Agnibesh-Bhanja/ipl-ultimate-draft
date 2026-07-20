import { useEffect, useState } from "react";
import api from "../api/api";

import CricketPitch from "../components/CricketPitch";
import RecommendationPanel from "../components/RecommendationPanel";
import Scoreboard from "../components/Scoreboard";
import DraftComplete from "../components/DraftComplete";
import Leaderboard from "../components/Leaderboard";
import InstructionsModal from "../components/InstructionsModal";

function Draft() {

    const [recommendations, setRecommendations] = useState([]);
    const [team, setTeam] = useState([]);
    const [summary, setSummary] = useState(null);

    const [activeSlot, setActiveSlot] = useState(null);

    const [showInstructions, setShowInstructions] = useState(true);

    useEffect(() => {

        loadRecommendations();
        loadSummary();

    }, []);

    async function loadRecommendations() {

        const res = await api.get("/recommend");

        setRecommendations(res.data);

    }

    async function loadSummary() {

        const res = await api.get("/summary");

        setSummary(res.data);

    }

    async function resetDraft() {

        await api.post("/reset");

        setTeam([]);
        setRecommendations([]);
        setSummary(null);
        setActiveSlot(null);

        await loadRecommendations();
        await loadSummary();

    }

    async function choosePlayer(cardId) {

        const res = await api.post(`/pick/${cardId}`);

        if (!res.data.success) {

            alert("Draft Complete!");

            return;

        }

        setTeam(res.data.team || []);
        setRecommendations(res.data.recommendations || []);
        setSummary(res.data.summary || {});
        setActiveSlot(null);

    }

    return (

        <>

            <InstructionsModal

                open={showInstructions}

                onClose={() => setShowInstructions(false)}

            />

            <div style={{ padding: 30 }}>

                <hr />

                {summary && (

                    <Scoreboard summary={summary} />

                )}

                <div className="main-layout">

                    <CricketPitch

                        team={team}

                        activeSlot={activeSlot}

                        setActiveSlot={setActiveSlot}

                    />

                </div>

                <Leaderboard />

                <hr />

                <RecommendationPanel

                    open={activeSlot !== null}

                    players={recommendations}

                    onChoose={choosePlayer}

                />

                {team.length === 11 && (

                    <DraftComplete

                        summary={summary}

                        onReset={resetDraft}

                        onSubmitSuccess={() => window.location.reload()}

                    />

                )}

            </div>

        </>

    );

}

export default Draft;
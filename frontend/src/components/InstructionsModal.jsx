import "./InstructionsModal.css";

function InstructionsModal({ open, onClose }) {

    if (!open) return null;

    return (

        <div className="instruction-overlay">

            <div className="instruction-box">

                <p className="welcome-tag">

                    WELCOME TO

                </p>

                <h1 className="game-title">

                    IPL ULTIMATE DRAFT

                </h1>

                <p className="game-subtitle">

                    Build the strongest XI, maximize chemistry and dominate the leaderboard.

                </p>

                <div className="instruction-list">

                    <div>⚡ Click any empty position on the pitch.</div>

                    <div>🎴 Choose one of the 5 recommended player cards. Remember Legacy is calculated rating of player upto season 2022, icon upto season 2021 and season card for 2023 and 2024 recents.</div>

                    <div>⭐ Overall = Average rating of your XI.</div>

                    <div>🤝 Chemistry increases with compatible players. For example try to have same team like rcb and rcb for better chemistry and similarly try for same season, legacy and icon.</div>

                    <div>🏆 Draft Score = Overall + Chemistry.</div>

                    <div>👑 Finish with the highest Draft Score and enter the Top 10.</div>

                </div>

                <button

                    className="start-btn"

                    onClick={onClose}

                >

                    START DRAFT

                </button>

            </div>

        </div>

    );

}

export default InstructionsModal;
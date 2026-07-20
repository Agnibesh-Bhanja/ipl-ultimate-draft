import "./PitchPlayerCard.css";

function PitchPlayerCard({ player }) {

    const type = (player.CardType || "").toLowerCase();

    return (

        <div className={`pitch-card ${type}`}>

            <div className="pitch-rating">
                {player.OVR}
            </div>

            <div className="pitch-role">
                {player.Role}
            </div>

            <div className="pitch-name">
                {player.Name}
            </div>

            <div className="pitch-team">
                {player.Team}
            </div>

            <div className="pitch-type">
                {player.CardType}
            </div>

        </div>

    );

}

export default PitchPlayerCard;
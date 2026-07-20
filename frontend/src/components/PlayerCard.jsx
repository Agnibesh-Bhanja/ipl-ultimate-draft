import "./PlayerCard.css";

function PlayerCard({ player, onClick }) {

    const type = (player.CardType || "season").toLowerCase();

    return (

        <div
            className={`draft-card ${type}`}
            onClick={onClick}
        >

            <div className="draft-rating">

                {player.OVR}

            </div>

            <div className="draft-role">

                {player.Role}

            </div>

            <div className="draft-name">

                {player.Name}

            </div>

            <div className="draft-team">

                {player.Team}

            </div>

            <div className="draft-type">

                {player.CardType}

            </div>

        </div>

    );

}

export default PlayerCard;
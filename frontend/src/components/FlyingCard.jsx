import "./FlyingCard.css";

function FlyingCard({ player, style }) {

    if (!player) return null;

    return (

        <div
            className="flying-card"
            style={style}
        >

            <div className="fly-rating">
                {player.OVR}
            </div>

            <div className="fly-name">
                {player.Name}
            </div>

            <div className="fly-role">
                {player.Role}
            </div>

            <div className="fly-type">
                {player.CardType}
            </div>

        </div>

    );

}

export default FlyingCard;
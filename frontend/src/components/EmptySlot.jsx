import "./EmptySlot.css";
import PitchPlayerCard from "./PitchPlayerCard";

function EmptySlot({

    role,
    player,
    active,
    onClick

}) {

    // If a player exists, show the FIFA card
    if (player) {

        return (

            <PitchPlayerCard player={player} />

        );

    }

    // Otherwise show an empty slot
    return (

        <div

            className={`slot-card ${active ? "slot-active" : ""}`}

            onClick={onClick}

        >

            <div className="slot-plus">

                +

            </div>

            <div className="slot-empty-role">

                {role}

            </div>

        </div>

    );

}

export default EmptySlot;
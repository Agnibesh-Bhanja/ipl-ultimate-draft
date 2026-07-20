import "./CricketPitch.css";
import EmptySlot from "./EmptySlot";

function CricketPitch({ team, activeSlot, setActiveSlot }) {

    const batsmen = (team || []).filter(
        p =>
            p.Role === "Batsman" ||
            p.Role === "Wicketkeeper/Batsman"
    );

    const allrounders = (team || []).filter(
        p => p.Role === "All-Rounder"
    );

    const bowlers = (team || []).filter(
        p => p.Role === "Bowler"
    );

    const slots = [

        { role: "BAT", player: batsmen[0] },

        { role: "BAT", player: batsmen[1] },
        { role: "BAT", player: batsmen[2] },

        { role: "BAT", player: batsmen[3] },
        { role: "BAT", player: batsmen[4] },

        { role: "AR", player: allrounders[0] },
        { role: "AR", player: allrounders[1] },

        { role: "BOWL", player: bowlers[0] },
        { role: "BOWL", player: bowlers[1] },
        { role: "BOWL", player: bowlers[2] },
        { role: "BOWL", player: bowlers[3] }

    ];

    return (

        <div className="pitch">

            {slots.map((slot, index) => (

                <div
                    key={index}
                    className={`pitch-slot slot-${index}`}
                >

                    <EmptySlot

                        role={slot.role}

                        player={slot.player}

                        active={activeSlot === index}

                        onClick={() => setActiveSlot(index)}

                    />

                </div>

            ))}

        </div>

    );

}

export default CricketPitch;
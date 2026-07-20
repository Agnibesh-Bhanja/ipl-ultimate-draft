import "./RecommendationPanel.css";
import PlayerCard from "./PlayerCard";
import { useEffect, useState } from "react";
import CardBack from "./Cardback";

function RecommendationPanel({

    open,
    players,
    onChoose

}){

    const [reveal,setReveal]=useState(false);

    useEffect(()=>{

        if(open){

            setReveal(false);

            const timer=setTimeout(()=>{

                setReveal(true);

            },1200);

            return ()=>clearTimeout(timer);

        }

    },[open]);

    if(!open) return null;

    return(

        <div className="panel-overlay">

            <div className="recommend-panel">

                <h2>Choose Your Player</h2>

                <div className="recommend-cards">

                    {!reveal &&

                        (players || []).map((_,i)=>(

                            <CardBack key={i}/>

                        ))

                    }

                    {reveal &&

                        players.map(player=>(

                            <PlayerCard

                                key={player.CardID}

                                player={player}

                                onClick={()=>onChoose(player.CardID)}

                            />

                        ))

                    }

                </div>

            </div>

        </div>

    )

}

export default RecommendationPanel;
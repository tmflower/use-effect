import React from "react";
import "./Card.css";

const Card = ({value, suit, image, dealing, getCard}) => {

    return (
        <>
            <button className={dealing ? "btn-dealing" : "btn-nondealing"} onClick={() => getCard()}>{dealing ? "Stop Dealing" : "Deal"}</button>            
            {value && suit ? <h1>I am the {value} of {suit}!</h1> : ""}
            {image ? <img src={image} alt="card value and suit"></img> : ""}            
        </>
    )
}

export default Card;
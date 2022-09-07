import React from "react";

const Card = ({value, suit, image, getCard}) => {

    return (
        <>
            <button onClick={() => getCard()}>Draw a Card</button>
            {value && suit ? <h1>I am the {value} of {suit}!</h1> : ""}
            {image ? <img src={image} alt="card value and suit"></img> : ""}            
        </>
    )
}

export default Card;
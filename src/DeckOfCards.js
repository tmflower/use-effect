import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const DeckOfCards = () => {

    const [deck_id, setDeck_id] = useState(null);

    const [remaining, setRemaining] = useState(52);
    const [value, setValue] = useState(null);
    const [suit, setSuit] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function getDeckId() {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            setDeck_id(response.data.deck_id);
            setRemaining(response.data.remaining);
        }
        getDeckId();
    },[]);


    async function getCard() {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
        if (res.data.remaining === 0) {
            alert("Error: no cards remaining!");
        }
        setRemaining(res.data.remaining);
        setValue(res.data.cards[0].value);
        setSuit(res.data.cards[0].suit);
        setImage(res.data.cards[0].image);
    }

    return (
        <>
            <h1>Deck of Cards: One Card Per Click</h1>
            <Card value={value} suit={suit} image={image} getCard={getCard}/>
            <h3>Cards remaining in deck: {remaining}</h3>            
        </>
    );
};

export default DeckOfCards;
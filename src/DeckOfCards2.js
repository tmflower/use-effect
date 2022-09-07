import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";

const DeckOfCards2 = () => {

    const [deck_id, setDeck_id] = useState(null);
    const [remaining, setRemaining] = useState(52);
    const [value, setValue] = useState(null);
    const [suit, setSuit] = useState(null);
    const [image, setImage] = useState(null);
    const [dealing, setDealing] = useState(false);

    const intervalId = useRef(null);
    
    useEffect(() => {
        async function getDeckId() {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            setDeck_id(response.data.deck_id);
            setRemaining(response.data.remaining);
        }
        getDeckId();
    },[setDeck_id]);


    async function getCard() {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

            if (res.data.remaining === 0) {
                setDealing(false);
                clearInterval(intervalId.current);
                throw new Error("No cards remaining!");
            }
            setRemaining(res.data.remaining);
            setValue(res.data.cards[0].value);
            setSuit(res.data.cards[0].suit);
            setImage(res.data.cards[0].image);
        }
        catch (err) {
            alert(err);
        }
    }

    const dealCards = () => {
        if (intervalId.current === null) {
            setDealing(true);
            intervalId.current = setInterval(async () => {
                await getCard();
            }, 1000);
        }
        else if (intervalId.current !== null) {
            clearInterval(intervalId.current);
            intervalId.current = null;
            setDealing(false);
        }       
    }

    const toggleDeal = () => {
        setDealing(dealing => !dealing);
        dealCards();
    }

    return (
        <>
            <h1>Deck of Cards: Single Click; One Card Per Second</h1>
            <Card value={value} suit={suit} image={image} getCard={toggleDeal} dealing={dealing}/>
            <h3>Cards remaining in deck: {remaining}</h3>            
        </>
    );
};

export default DeckOfCards2;
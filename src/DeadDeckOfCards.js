import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const DeckOfCards = () => {

    const [deck_id, setDeck_id] = useState(null);
    const [allCards, setAllCards] = useState(null);
    const [remaining, setRemaining] = useState(52);
    const [value, setValue] = useState(null);
    const [suit, setSuit] = useState(null);

    useEffect(() => {
        async function getDeckId() {
            const response = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            setDeck_id(response.data.deck_id);
            setRemaining(response.data.remaining);

            // const res = await axios.get(`https://deckofcardsapi.com/api/deck/${response.data.deck_id}/draw/?count=1`);
            // console.log(res.data.cards);

            // setValue(res.data.cards.value);
            // setSuit(res.data.cards.suit);
        }
        getDeckId();
    },[]);
    
    // useEffect(() => {
    //     async function getCard() {
    //             const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
    //             console.log(response.data.cards[0].value);
    //             console.log(response.data.cards[0].suit);
    //             console.log(response.data.cards[0]);

    //             setValue(response.data.cards[0].value);
    //             setSuit(response.data.cards[0].suit);

    //             // const getCard = () => {
    //             //     for (let i = 0; i < 52; i++) {
    //             //         setValue(response.data.cards.value);
    //             //         setSuit(response.data.cards.suit);
    //             //     }
    //             // }
    //             // getCard();

    //         }
    //     getCard();
    // }, [deck_id]);

    // const handleClick = () => {
    //     getCard();
    // }

    useEffect(() => {
        async function getDeck() {
                const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`);

                setAllCards(response.data.cards);
                // console.log(allCards);
                // const getCard = () => {
                //     for (let i = 0; i < allCards.length; i++) {
                //         setValue(allCards[i].value);
                //         setSuit(allCards[i].suit);
                //     }
                // }
                getDeck();

                // setValue(response.data.cards.value);
                // setSuit(response.data.cards.suit);

            }
        getDeck();
        
    }, [deck_id]);

    


    return (
        <>
            <h1>I AM A DECK</h1>
            <h2>My id is: {deck_id}</h2>
            <Card value={value} suit={suit}/>
            <h3>Cards remaining in deck: {remaining}</h3>
            <button onClick={() => alert('you clicked!')}>Draw a Card</button>
        </>
    );
};

export default DeckOfCards;
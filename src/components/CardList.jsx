/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import AddCard from './AddCard';

function CardList({ id }) {
    const [cards, setCards] = useState([]);
    // const [cardName, setCardName] = useState('');
    // const [addCard, setAddCard] = useState(false);
    const { apiKey, apiSecret } = JSON.parse(sessionStorage.getItem('authInfo'));

    useEffect(() => {
        // console.log('CardList useEffect');
        const getCardList = async (cardId) => {
            const response = await fetch(
                `https://api.trello.com/1/lists/${cardId}/cards?key=${apiKey}&token=${apiSecret}`
            );
            const data = await response.json();
            // console.log(data);
            setCards(data);
        };
        getCardList(id);
    }, [cards]);

    return (
        <ul className="list-items">
            {cards.map((card) => (
                <li key={card.id}>
                    <h3>{card.name}</h3>
                </li>
            ))}

            <AddCard id={id} />
        </ul>
    );
}

export default CardList;

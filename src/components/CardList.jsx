/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Modal from './Modal';

function CardList({ id }) {
    const [cards, setCards] = useState([]);
    const [show, setShow] = useState('');
    const [cardName, setCardName] = useState('');
    // const [addCard, setAddCard] = useState(false);
    const [isError, setIsError] = useState({ cardNameIsEmpty: false });
    const { apiKey, apiSecret } = JSON.parse(sessionStorage.getItem('authInfo'));

    const params = useParams();

    // create card

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(cardName);

        if (cardName === '') {
            setIsError({ cardNameIsEmpty: true });
        }

        const addCardApiUrl = await fetch(
            `https://api.trello.com/1/cards?idList=${id}&name=${cardName}&key=${apiKey}&token=${apiSecret}`,
            {
                method: 'POST',
            }
        );

        if (addCardApiUrl.status === 200) {
            console.log('Card created!');

            const data = await addCardApiUrl.json();
            setShow(false);
            setCards([...cards, data]);

            // window.location.reload();
        }
    };

    useEffect(() => {
        console.log('CardList useEffect');
        const getCardList = async () => {
            const response = await fetch(
                `https://api.trello.com/1/lists/${id}/cards?key=${apiKey}&token=${apiSecret}`
            );
            const data = await response.json();
            // console.log(data);
            setCards(data);
        };
        getCardList();
    }, []);

    console.log('card list render');
    return (
        <ul className="list-items">
            {cards.map((card) => (
                <li key={card.id}>
                    <h3>{card.name}</h3>
                </li>
            ))}
            <div>
                <button type="button" onClick={() => setShow(true)} className="btn-sm">
                    + Add a Card{' '}
                </button>
                <Modal open={show} onClose={() => setShow(false)}>
                    <div className="modelContent">
                        <h2>Add Card</h2>
                        <form>
                            <p>Card Name:</p>
                            <input
                                name="cardName"
                                type="text"
                                onChange={(e) => setCardName(e.target.value)}
                            />

                            <p className="errorMsg">
                                {isError.cardNameIsEmpty && 'Card name is empty!'}
                            </p>

                            <button className="btn" type="submit" onClick={handleSubmit}>
                                Add
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </ul>
    );
}

export default CardList;

import { useState } from 'react';

import Modal from './Modal';

function AddCard({ id }) {
    const [show, setShow] = useState(false);
    const [cardName, setCardName] = useState('');
    const [isError, setIsError] = useState({ cardNameIsEmpty: false });
    const { apiKey, apiSecret } = JSON.parse(sessionStorage.getItem('authInfo'));
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cardName === '') {
            setIsError({ cardNameIsEmpty: true });
            return;
        }

        const addCardApiUrl = await fetch(
            `https://api.trello.com/1/cards?idList=${id}&name=${cardName}&key=${apiKey}&token=${apiSecret}`,
            {
                method: 'POST',
            }
        );

        if (addCardApiUrl.status === 200) {
            console.log('Card created!');
            setShow(false);

            window.location.reload();
        } else {
            console.log('Card not created!');
        }
    };

    return (
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
                        <button className="btn" onClick={handleSubmit} type="submit">
                            Add
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default AddCard;

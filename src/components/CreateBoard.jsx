/* eslint-disable global-require */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import Modal from './Modal';

export default function CreateBoard({ onBoard }) {
    const [show, setShow] = useState(false);
    const [boardName, setBoardName] = useState('');
    const [boardDesc, setBoardDesc] = useState('');
    const [isError, setIsError] = useState({ boardNameIsEmpty: false });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('from create board', boardName);

        const getNewBoardData = {
            name: boardName,
            desc: boardDesc,
        };

        if (getNewBoardData.name === '') {
            setIsError({ boardNameIsEmpty: true });
        } else {
            onBoard(getNewBoardData);
            setShow(false);
            setBoardName('');
            setBoardDesc('');
        }
    };
    return (
        <div>
            <div>
                <button className="createBoard" type="button" onClick={() => setShow(true)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            stroke="#d9e3f0"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10c2.29 0 3.43 1.14 3.43 3.43"
                        />
                        <path
                            stroke="#d9e3f0"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M18.57 22H14c-2.29 0-3.43-1.14-3.43-3.43v-7.14C10.57 9.14 11.71 8 14 8h4.57C20.86 8 22 9.14 22 11.43v7.14c0 2.29-1.14 3.43-3.43 3.43zM14.87 15h3.26M16.5 16.63v-3.26"
                        />
                    </svg>
                    Create Board
                </button>
                <Modal open={show} onClose={() => setShow(false)}>
                    <div className="modelContent">
                        <h2>Create Board</h2>
                        <form>
                            <p>Board Name:</p>
                            <input
                                name="boardName"
                                type="text"
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}
                            />
                            <p>Board Description:</p>
                            <input
                                name="boardDesc"
                                type="text"
                                value={boardDesc}
                                onChange={(e) => setBoardDesc(e.target.value)}
                            />
                            <p className="errorMsg">
                                {isError.boardNameIsEmpty && 'Board name is required !'}
                            </p>

                            <button type="submit" className="btn" onClick={handleSubmit}>
                                Create{' '}
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

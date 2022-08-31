/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateBoard from './CreateBoard';
import Modal from './Modal';

export default function Home() {
    const [boards, setBoards] = useState([]);
    const { idOrganizations } = JSON.parse(sessionStorage.getItem('apiData'));
    const defaultOrgID = idOrganizations[0] || '';
    const { apiKey, apiSecret } = JSON.parse(sessionStorage.getItem('authInfo'));

    const [boardName, setBoardName] = useState('');
    const [boardDesc, setBoardDesc] = useState('');
    const [boardId, setBoardId] = useState('');
    const [show, setShow] = useState(false);
    const [isError, setIsError] = useState({ boardNameIsEmpty: false });

    // // create new board
    const handleNewBoard = async (newBoard) => {
        const response = await fetch(
            `https://api.trello.com/1/boards/?name=${newBoard.name}&desc=${newBoard.desc}&key=${apiKey}&token=${apiSecret}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.status === 200) {
            console.log('Board created!');
            const data = await response.json();
            setBoards([...boards, data]);
            setShow(false);
        }
    };

    // update boards when new board is created

    const getBoardData = (e, boardUpdateId, name, description) => {
        console.log(name, description);
        e.preventDefault();
        setBoardName(name);
        setBoardDesc(description);
        setBoardId(boardUpdateId);
        setShow(true);
    };

    // update board
    const updateBoard = async (e) => {
        e.preventDefault();

        if (boardName === '') {
            setIsError({ boardNameIsEmpty: true });
            return;
        }

        const updatedUrl = await fetch(
            `https://api.trello.com/1/boards/${boardId}/?name=${boardName}&desc=${boardDesc}&key=${apiKey}&token=${apiSecret}`,
            {
                method: 'PUT',
            }
        );

        if (updatedUrl.status === 200) {
            console.log('Board updated!');

            const data = await updatedUrl.json();
            setBoards(boards.map((el) => (el.id === data.id ? { ...data } : el)));
            setShow(false);
        }
    };

    //
    const deleteHandler = async (e, boardDelId) => {
        e.preventDefault();

        const isDelete = confirm('Are you sure you want to delete this board?');
        if (isDelete) {
            const deletedUrl = await fetch(
                `https://api.trello.com/1/boards/${boardDelId}/?key=${apiKey}&token=${apiSecret}`,
                {
                    method: 'DELETE',
                }
            );

            if (deletedUrl.status === 200) {
                const curBoard = boards.filter((board) => board.id !== boardDelId);
                setBoards(curBoard);
                //  setShow(false);
                console.log('Board deleted!');
            }
        }
    };

    useEffect(() => {
        console.log('useEffect in created card');
        const getData = async () => {
            const response = await fetch(
                `https://api.trello.com/1/organizations/${defaultOrgID}/boards?key=${apiKey}&token=${apiSecret}`
            );
            const data = await response.json();
            //  console.log(data);
            setBoards(data);
        };
        getData();
    }, []);

    console.log('render home ');
    return (
        <div className="container">
            <h3 className="titleBoard">Board List</h3>

            {updateBoard && (
                <Modal open={show} onClose={() => setShow(false)}>
                    <h2>Update Board</h2>
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
                            {isError.boardNameIsEmpty && 'Board name is empty!'}
                        </p>
                        <button className="btn" type="submit" onClick={updateBoard}>
                            Update
                        </button>
                    </form>
                </Modal>
            )}

            <div className="boards">
                <CreateBoard onBoard={handleNewBoard} />

                {boards.map((board) => (
                    <Link
                        className="boardsItem"
                        key={board.id}
                        to={`/${board.id}?name=${board.name}`}
                    >
                        <div className="action">
                            <button
                                type="button"
                                onClick={(e) => getBoardData(e, board.id, board.name, board.desc)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h2c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 5.43-2.32 7.75-7.75 7.75Z"
                                        fill="#2c3e50"
                                    />
                                    <path
                                        d="M8.5 17.689c-.61 0-1.17-.22-1.58-.62-.49-.49-.7-1.2-.59-1.95l.43-3.01c.08-.58.46-1.33.87-1.74l7.88-7.88c1.99-1.99 4.01-1.99 6 0 1.09 1.09 1.58 2.2 1.48 3.31-.09.9-.57 1.78-1.48 2.68l-7.88 7.88c-.41.41-1.16.79-1.74.87l-3.01.43c-.13.03-.26.03-.38.03Zm8.07-14.14-7.88 7.88c-.19.19-.41.63-.45.89l-.43 3.01c-.04.29.02.53.17.68.15.15.39.21.68.17l3.01-.43c.26-.04.71-.26.89-.45l7.88-7.88c.65-.65.99-1.23 1.04-1.77.06-.65-.28-1.34-1.04-2.11-1.6-1.6-2.7-1.15-3.87.01Z"
                                        fill="#2c3e50"
                                    />
                                    <path
                                        d="M19.85 9.83c-.07 0-.14-.01-.2-.03a7.937 7.937 0 0 1-5.46-5.46.76.76 0 0 1 .52-.93c.4-.11.81.12.92.52.6 2.13 2.29 3.82 4.42 4.42.4.11.63.53.52.93-.09.34-.39.55-.72.55Z"
                                        fill="#2c3e50"
                                    />
                                </svg>
                            </button>
                            <button type="button" onClick={(e) => deleteHandler(e, board.id)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M9.17 15.58c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l5.66-5.66c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L9.7 15.36c-.14.15-.34.22-.53.22Z"
                                        fill="#2c3e50"
                                    />
                                    <path
                                        d="M14.83 15.58c-.19 0-.38-.07-.53-.22L8.64 9.7a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l5.66 5.66c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22Z"
                                        fill="#2c3e50"
                                    />
                                    <path
                                        d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75Zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9Z"
                                        fill="#2c3e50"
                                    />
                                </svg>
                            </button>
                        </div>
                        <h4>{board.name}</h4>
                    </Link>
                ))}
            </div>
        </div>
    );
}

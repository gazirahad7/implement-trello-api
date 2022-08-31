/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardList from './CardList';

function BoardList() {
    const [lists, setList] = useState([]);
    // const [listName, setListName] = useState('');
    const params = useParams();
    const { apiKey, apiSecret } = JSON.parse(sessionStorage.getItem('authInfo'));
    const paramsName = new URL(document.location).searchParams;
    const BoardName = paramsName.get('name');

    const getBoardList = async () => {
        const response = await fetch(
            `https://api.trello.com/1/boards/${params.id}/lists?key=${apiKey}&token=${apiSecret}`
        );
        const data = await response.json();
        setList(data);
    };

    useEffect(() => {
        getBoardList();
    }, []);
    return (
        <div className="boardList">
            <h4 className="boardName">{BoardName}</h4>
            <div className="lists-container">
                {lists.map((list) => (
                    <div className="list" key={list.id}>
                        <h3 className="list-title">{list.name}</h3>
                        <CardList id={list.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BoardList;

import { Route, Routes } from 'react-router-dom';

import '../assets/CSS/global.css';
import Auth from './Auth';
import BoardList from './BoardList';
import CreateBoard from './CreateBoard';
import Home from './Home';
import Navbar from './Navbar';
import Profile from './Profile';

export default function PagesLink() {
    const checkAuthorize = JSON.parse(sessionStorage.getItem('authInfo'));
    const loggedIn = checkAuthorize ? checkAuthorize.login : false;
    return (
        <>
            {loggedIn && <Navbar />}
            <Routes>
                <Route path="/" element={loggedIn ? <Home /> : <Auth />} />
                <Route path="/:id" element={<BoardList />} />
                <Route path="/boards" element={<CreateBoard />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    );
}

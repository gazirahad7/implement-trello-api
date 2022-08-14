import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="container">
            <nav className="navbarContainer">
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

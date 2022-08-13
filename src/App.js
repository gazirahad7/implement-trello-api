/* eslint-disable import/no-unresolved */
/* eslint-disable no-unreachable */
/* eslint-disable import/no-named-as-default */
import { BrowserRouter } from 'react-router-dom';
import './assets/CSS/global.css';
import PagesLink from './components/PagesLink';

function App() {
    return (
        <div>
            <BrowserRouter>
                <PagesLink />
            </BrowserRouter>
        </div>
    );
}

export default App;

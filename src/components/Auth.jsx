import { useState } from 'react';

export default function Auth() {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [isError, setIsError] = useState({ key: false, token: false });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (apiKey === '' || apiSecret === '') {
            setIsError({ key: true });
            return;
        }
        const apiUrl = await fetch(
            `https://api.trello.com/1/members/me/?key=${apiKey}&token=${apiSecret}`
        );
        console.log(apiUrl);

        if (apiUrl.status === 200) {
            console.log('Success');
            const apiData = await apiUrl.json();
            console.log(apiData);

            const authInfo = { login: true, apiKey, apiSecret };
            console.log(authInfo);
            sessionStorage.setItem('authInfo', JSON.stringify(authInfo));
            sessionStorage.setItem('apiData', JSON.stringify(apiData));
            window.location.reload();
        } else {
            setIsError({ token: true });
        }
    };

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <form>
                    <h2>Authorization</h2>

                    <div>
                        <p>API KEY</p>
                        <input type="text" onChange={(e) => setApiKey(e.target.value)} />
                    </div>
                    <div>
                        <p>API SECRET</p>
                        <input type="text" onChange={(e) => setApiSecret(e.target.value)} />
                    </div>

                    <p className="errorMsg">{isError.key && 'Input Please?'}</p>
                    <p className="errorMsg">{isError.token && 'Authorization Failed'}</p>

                    <button onClick={handleSubmit} className="btn" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function Profile() {
    const userInfo = JSON.parse(sessionStorage.getItem('apiData'));
    const { avatarUrl, email, fullName } = userInfo;
    console.log(avatarUrl, email, fullName);

    const logout = () => {
        sessionStorage.removeItem('authInfo');
        sessionStorage.removeItem('apiData');
        window.location = '/';
    };

    return (
        <div className="profileContainer">
            <div className="profileCard">
                <div className="profileCardAvatar">
                    <img src={avatarUrl} alt="avatar" />
                </div>
                <div className="profileCardInfo">
                    <h2>{fullName}</h2>
                    <p>{email}</p>
                </div>
                <button onClick={logout} className="btn" type="button">
                    Logout
                </button>
            </div>
        </div>
    );
}

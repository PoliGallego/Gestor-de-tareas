import '../Header.css'

function Header() {
    return (<div className='header'>
        <button onClick={() => window.location.href="http://localhost:3030/"}>
            <img draggable={false} className='header-img'
                src={"https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2023/08/tiktok-no-profile-picture.png"} alt="profile picture" />
        </button>
        <input type="button" value="Cerrar sesión" onClick={() => window.location.href="http://localhost:3000/"}/>
    </div>);
}

export default Header;
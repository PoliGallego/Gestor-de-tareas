import '../src/assets/Header.css'

function Header() {
    return (<header>
        <button onClick={() => window.location.href="http://localhost:3030/"}>
            <img draggable={false} className='header-img'
                src={"https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2023/08/tiktok-no-profile-picture.png"} alt="profile picture" />
        </button>
        <input type="button" value="Close session" onClick={() => window.location.href="http://localhost:3000/"}/>
    </header>);
}

export default Header;
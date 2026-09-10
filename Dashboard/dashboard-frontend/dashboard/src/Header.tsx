import '../src/assets/Header.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
    return (<header>
        <button className='btn-img' onClick={() => window.location.href="http://localhost:3030/"}>
            <img draggable={false} className='header-img'
                src={"https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2023/08/tiktok-no-profile-picture.png"} alt="profile picture" />
        </button>
        <button onClick={() => window.location.href="http://localhost:5173/"}><i className="fa-solid fa-home"></i></button>
        <input type="button" value="Log out" onClick={() => window.location.href="http://localhost:3000/"}/>
    </header>);
}

export default Header;
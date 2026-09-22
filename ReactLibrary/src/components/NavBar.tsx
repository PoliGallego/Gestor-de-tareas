import { Button } from "./Button";
import { ProfilePic } from "./ProfilePic";
import home from "../assets/home.png";
import logout from "../assets/logout.png";
import { logOut } from "../Services/DashboardService";

export type NavBarProps = {
    imgUrl: string | null;
    userName: string;
}

export function NavBar({imgUrl, userName}: NavBarProps) {
    const logOutUser = async () => {
        await logOut();
    };

    return (<header className="navBar">
        <button className='btn-img' onClick={() => window.location.href = "http://localhost:3030/"}>
            <ProfilePic imgUrl={imgUrl} userName={userName} />
        </button>
        <Button onClick={() => window.location.href = "http://localhost:3020/"}>
            <img className="in-img" src={home} alt="home page" draggable={false}/>
        </Button>
        <Button onClick={() => logOutUser()}>
            <img className="in-img" src={logout} alt="log out" draggable={false}/>
        </Button>
    </header>);
}
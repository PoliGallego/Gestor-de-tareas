import { useEffect, useState } from "react";
import home from "../assets/home.png";
import logout from "../assets/logout.png";
import { Button } from "./Button";
import { ProfilePic } from "./ProfilePic";
import { SideBar } from "./SideBar";
import { auth, logOut, setPage } from "../Services/AuthService";
import type { User } from "../Services/AuthService";

export function NavBar() {
    const [isSBShow, setSBShow] = useState(false);
    const [isRender, setIsRender] = useState(false);
    const [user, setUser] = useState<User>({
        name: "NA",
        email: "",
        picture: null
    });

    useEffect(() => {
        if (!isRender) {
            authUser();
            setIsRender(true);
        }
    }, []);

    const authUser = async () => {
        try {
            const data = await auth();
            if (data) {
                setUser(data);
            } else {
                await logOut();
            }
        } catch (error) {
            await logOut();
        }
    }

    const logOutUser = async () => {
        await logOut();
    };

    return (<header className="navBar">
        <button className='btn-img' onClick={() => setSBShow(true)}>
            <ProfilePic imgUrl={user?.picture} userName={user.name ?? "NA"} />
        </button>
        <Button onClick={() => setPage("home")}>
            <img className="in-img" src={home} alt="home page" draggable={false} />
        </Button>
        <Button onClick={() => logOutUser()}>
            <img className="in-img" src={logout} alt="log out" draggable={false} />
        </Button>
        {isSBShow && <SideBar setShow={setSBShow} />}
    </header>);
}
import { useEffect, useState } from "react";
import home from "../assets/home.png";
import logout from "../assets/logout.png";
import { Button } from "./Button";
import { ProfilePic } from "./ProfilePic";
import { SideBar } from "./SideBar";
import { auth, logOut, setPage } from "../services/AuthService";
import type { User } from "../services/AuthService";
import { Modal } from "./Modal";

export function NavBar() {
    const [isPageNotLoad, setIsPageNotLoad] = useState(false);
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
        <Button onClick={() => setPage("prin").catch(() => setIsPageNotLoad(true))}>
            <img className="in-img" src={home} alt="home page" draggable={false} />
        </Button>
        <Button onClick={() => logOutUser()}>
            <img className="in-img" src={logout} alt="log out" draggable={false} />
        </Button>
        {isPageNotLoad && <Modal title={"Información"} text={"No se pudo cargar la página"} isChoose={false} setShow={setIsPageNotLoad} />}
        {isSBShow && <SideBar setShow={setSBShow} onError={() => setIsPageNotLoad(true)} />}
    </header>);
}
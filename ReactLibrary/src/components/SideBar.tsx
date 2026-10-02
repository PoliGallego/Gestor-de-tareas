import { logOut, setPage } from "../Services/AuthService";
import { Button } from "./Button";

export type SideProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideBar({ setShow }: SideProps) {
    return <div className="side-body" onClick={() => setShow(false)}>
        <div className="side-cont">
            <div className="side-head">
                <h2>Navegación</h2>
            </div>

            <div className="side-btns">
                {/* <Button variant="quiet" text="Hogar" onClick={() => setPage("home")} /> */}
                <Button variant="quiet" text="Principal" onClick={() => setPage("prin")} />
                <Button variant="quiet" text="Perfil" onClick={() => setPage("perf")} />
                <Button variant="quiet" text="Reportes" onClick={() => setPage("reportes")} />
                <Button variant="quiet" text="Crear cuenta" onClick={() => setPage("signup")} />
                <Button variant="quiet" text="Cerrar sesión" onClick={() => logOut()} />
            </div>
        </div>
    </div>;
}
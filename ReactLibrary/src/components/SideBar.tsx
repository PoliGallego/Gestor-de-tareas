import { logOut, setPage } from "../services/AuthService";
import { Button } from "./Button";

export type SideProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    onError?: (error: unknown) => void;
}

export function SideBar({ setShow, onError }: SideProps) {
    return <div className="side-body" onClick={() => setShow(false)}>
        <div className="side-cont">
            <div className="side-head">
                <h2>Navegación</h2>
            </div>

            <div className="side-btns">
                {/* <Button variant="quiet" text="Hogar" onClick={() => setPage("home").catch((error) => onError?.(error))} /> */}
                <Button variant="quiet" text="Principal" onClick={() => setPage("prin").catch((error) => onError?.(error))} />
                <Button variant="quiet" text="Perfil" onClick={() => setPage("perf").catch((error) => onError?.(error))} />
                <Button variant="quiet" text="Reportes" onClick={() => setPage("reportes").catch((error) => onError?.(error))} />
                <Button variant="quiet" text="Crear cuenta" onClick={() => setPage("signup").catch((error) => onError?.(error))} />
                <Button variant="quiet" text="Cerrar sesión" onClick={() => logOut()} />
            </div>
        </div>
    </div>;
}
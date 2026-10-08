import { useState } from "react";
import { logOut, setPage } from "../services/AuthService";
import { Button } from "./Button";
import { Modal } from "./Modal";

export function Footer() {
    const [isPageNotLoad, setIsPageNotLoad] = useState(false);

    return <footer>
        {isPageNotLoad && <Modal title={"Información"} text={"No se pudo cargar la página"} isChoose={false} setShow={setIsPageNotLoad} />}
        <h4>© 2026 PDP Inc.</h4>
        <Button variant="quiet" text="Hogar" onClick={() => setPage("home").catch(() => setIsPageNotLoad(true))} />
        <Button variant="quiet" text="Principal" onClick={() => setPage("prin").catch(() => setIsPageNotLoad(true))} />
        <Button variant="quiet" text="Perfil" onClick={() => setPage("perf").catch(() => setIsPageNotLoad(true))} />
        <Button variant="quiet" text="Crear cuenta" onClick={() => setPage("signup").catch(() => setIsPageNotLoad(true))} />
        <Button variant="quiet" text="Cerrar sesión" onClick={() => logOut()} />
    </footer>
}
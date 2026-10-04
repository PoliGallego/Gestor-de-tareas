import { logOut, setPage } from "../services/AuthService";
import { Button } from "./Button";

export function Footer() {
    return <footer>
        <h4>© 2026 PDP Inc.</h4>
        <Button variant="quiet" text="Hogar" onClick={() => setPage("home")} />
        <Button variant="quiet" text="Principal" onClick={() => setPage("prin")} />
        <Button variant="quiet" text="Perfil" onClick={() => setPage("perf")} />
        <Button variant="quiet" text="Crear cuenta" onClick={() => setPage("signup")} />
        <Button variant="quiet" text="Cerrar sesión" onClick={() => logOut()} />
    </footer>
}
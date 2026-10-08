import '../assets/css/home.css'
import { usePageContext } from "../PageContext.tsx";
import { Button, logOut, setPage } from "@gestor-tareas/react-components";

function Home() {
    const { isAuth, setMessage } = usePageContext();

    const setPageNotLoad = () => {
        setMessage("No se pudo cargar la página");
    }

    return <div className='body'>
        <div className='welcome'>
            <h1>{isAuth ? "¡Bienvenido de vuelta!" : "Te damos la bienvenida a nuestra aplicación"}</h1>
            {isAuth ? <h2>{"Inicia con tu trabajo de hoy en la página "}
                <a className='switch-link' onClick={() => setPage("prin").catch(() => setPageNotLoad())}>principal</a>
            </h2> :
                <h2>{"Crea tu cuenta hoy "}
                    <a className='switch-link' onClick={() => setPage("signup").catch(() => setPageNotLoad())}>aquí</a>
                </h2>}
        </div>

        {isAuth ? <div className='home-bts'>
            <Button variant="quiet" text="Principal" onClick={() => setPage("prin").catch(() => setPageNotLoad())} />
            <Button variant="quiet" text="Perfil" onClick={() => setPage("perf").catch(() => setPageNotLoad())} />
            <Button variant="quiet" text="Reportes" onClick={() => setPage("reportes").catch(() => setPageNotLoad())} />
            <Button variant="quiet" text="Crear cuenta" onClick={() => setPage("signup").catch(() => setPageNotLoad())} />
            <Button variant="quiet" text="Cerrar sesión" onClick={() => logOut()} />
        </div> :
            <h2 className='subtitle'>{"¿Ya tienes una cuenta? "}
                <a className='switch-link' onClick={() => setPage("login").catch(() => setPageNotLoad())}>Inicia sesión</a>
            </h2>}
    </div>;
}

export default Home;
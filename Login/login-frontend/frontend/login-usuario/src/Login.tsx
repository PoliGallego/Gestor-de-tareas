import './assets/css/login.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, type SubmitEvent } from 'react';
import { usePageContext } from "./PageContext.tsx";

function Login() {
    const { setMessage } = usePageContext();
    const [loginForm, setLoginForm] = useState({
        email: "",
        pass: ""
    });

    async function auth() {
        try {
            const response = await fetch('http://localhost:8080/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(loginForm)
            });

            let data = await response.json();
            if (response && data) {
                let msg = data.message;
                if (response.status === 202) {
                    localStorage.setItem("AT", data.accessToken);
                    localStorage.setItem("RT", data.refreshToken);
                    localStorage.setItem("TT", data.tokenType);
                }
                setMessage(msg);
            }
        } catch (error) {
            console.error(error);
            setMessage("Error");
        }
    }

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        auth();
    };

    return <div className='body'>
        <div className="in-container">
            <div id="loginForm" className="login form-container">
                <div className="form-header">
                    <h2>Login</h2>
                </div>

                <form id="loginFormElement" onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="identification">E-mail</label>
                        <input type="email" id="identification" name="identification" onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={e => setLoginForm({ ...loginForm, pass: e.target.value })} required />
                        <div className='right'>
                            {/* <a className='switch-link'>¿Olvidaste tu contraseña?</a> */}
                        </div>
                    </div>

                    <div className='footer'>
                        {/* <div className='alter'>
                            <h4>Otras formas</h4>
                            <div className='alter-bts'>
                                <a className='alter-btn'><i className='alter-btn fab fa-google'></i></a>
                                <a className='alter-btn'><i className='alter-btn fab fa-facebook'></i></a>
                            </div>
                        </div> */}
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>

                {/* <div className="switch-form">
                    ¿No tienes una cuenta?
                    <a className="switch-link"> Créala aquí</a>
                </div> */}
            </div>
        </div>
    </div>;
}

export default Login;
import '../assets/css/SignUp.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, type SubmitEvent } from 'react';
import { usePageContext } from "../PageContext.tsx";
import { signup, type SignUpDTO } from '../services/signUpService.ts';
import { setPage } from '@gestor-tareas/react-components';

function SignUp() {
    const { setMessage } = usePageContext();
    const [isSending, setIsSending] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [signUpForm, setSignUpForm] = useState<SignUpDTO>({
        name: "",
        email: "",
        pass: ""
    });

    async function signUp() {
        if (!isSending) {
            try {
                setIsSending(true);
                await signup(signUpForm);
                setIsSending(false);
                try {
                    await setPage("prin");
                } catch (error) {
                    setMessage("No se pudo cargar la página principal")
                }
                return;
            } catch (error) {
                console.error(error);
                setIsSending(false);
                setMessage("Error Interno, inténtalo más tarde");
            }
        }
    };

    const validate = (): boolean => {
        const regexMail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;;
        const regexName: RegExp = /^[A-Za-z ]{3,30}$/;;

        const errorName: boolean = !regexName.test(signUpForm.name);
        const errorEmail: boolean = !regexMail.test(signUpForm.email);
        const errorPass: boolean = signUpForm.pass.length < 8;

        if (errorName) {
            setMessage("Nombre de usuario inválido");
        } else if (errorEmail) {
            setMessage("Correo electrónico inválido");
        } else if (errorPass) {
            setMessage("Contraseña demasiado débil");
        }

        return errorName || errorEmail || errorPass;
    };

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validate()) {
            if (signUpForm.pass === confirmPass) {
                signUp();
            } else {
                setMessage("Las contraseñas no coinciden");
            }
        }
    };

    return <div className='body'>
        <div className="in-container">
            <div id="signupForm" className="signup form-container">
                <div className="form-header">
                    <h2>Crear Cuenta</h2>
                </div>

                <form id="signupFormElement" onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="user-name">Nombre de usuario</label>
                        <input type="text" id="user-name" name="identification" onChange={e => setSignUpForm({ ...signUpForm, name: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="identification">E-mail</label>
                        <input type="email" id="identification" name="identification" onChange={e => setSignUpForm({ ...signUpForm, email: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" onChange={e => setSignUpForm({ ...signUpForm, pass: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password-con">Confirmar Contraseña</label>
                        <input type="password" id="password-con" name="password" onChange={e => setConfirmPass(e.target.value)} required />
                    </div>

                    <div className='footer'>
                        {/* <div className='alter'>
                            <h4>Otras formas</h4>
                            <div className='alter-bts'>
                                <a className='alter-btn'><i className='alter-btn fab fa-google'></i></a>
                                <a className='alter-btn'><i className='alter-btn fab fa-facebook'></i></a>
                            </div>
                        </div> */}
                        <button type="submit" className="btn" disabled={isSending}>Aceptar</button>
                    </div>
                </form>

                <div className="switch-form">
                    {"¿Ya tienes una cuenta? "}
                    <a className="switch-link" onClick={async () => {
                        try {
                            await setPage("login");
                        } catch (error) {
                            setMessage("No se pudo cargar la página")
                        }
                    }}>Inicia sesión aquí</a>
                </div>
            </div>
        </div>
    </div>;
}

export default SignUp;
import './assets/css/SignUp.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, type SubmitEvent } from 'react';
import { usePageContext } from "./PageContext.tsx";

function SignUp() {
    const { setMessage } = usePageContext();
    const [confirmPass, setConfirmPass] = useState("");
    const [signUpForm, setSignUpForm] = useState({
        name: "",
        email: "",
        pass: ""
    });

    async function signUp() {
        try {
            const response = await fetch('http://localhost:8090/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpForm)
            });

            let data = await response.json();
            if (response && data) {
                let msg = data.message;
                if (response.status === 201) {
                    window.location.href = "http://localhost:3030/";
                } else {
                    setMessage(msg);
                }
            }
        } catch (error) {
            console.error(error);
            setMessage("Error");
        }
    }

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (signUpForm.pass === confirmPass) {
            signUp();
        } else {
            setMessage("The passwords do not match");
        }
    };

    return <div className='body'>
        <div className="in-container">
            <div id="signupForm" className="signup form-container">
                <div className="form-header">
                    <h2>Sign Up</h2>
                </div>

                <form id="signupFormElement" onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="user-name">User Name</label>
                        <input type="text" id="user-name" name="identification" onChange={e => setSignUpForm({ ...signUpForm, name: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="identification">E-mail</label>
                        <input type="email" id="identification" name="identification" onChange={e => setSignUpForm({ ...signUpForm, email: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={e => setSignUpForm({ ...signUpForm, pass: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password-con">Confirm Password</label>
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
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>

                <div className="switch-form">
                    Already have an account?
                    <a className="switch-link" onClick={() => window.location.href="http://localhost:3000/"}> Login here</a>
                </div>
            </div>
        </div>
    </div>;
}

export default SignUp;
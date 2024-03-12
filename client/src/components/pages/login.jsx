/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../index"
import { getDatabase, ref, set } from "firebase/database";
import '../../style.css';

export const Login = ({ user }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    };

    const handleSignUp = () => {
        if (!email || !password) return;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate('/'); // Redirect to the dashboard after login
                let db = getDatabase();
                let userRef = ref(db, "users/" + user.uid);
                let newData = {
                    saved: {},
                    pfp: "",
                    following: {}
                }
                set(userRef, newData)
                    .then(() => {
                        console.log("User " + user.uid + " registered successfully!");
                    })
                    .catch((error) => {
                        console.log("User " + user.uid + " failed to be registered: " + error);
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const handleSignIn = () => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate('/discover'); // Redirect to the dashboard after login
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return (
        <section>
            <form className="login flex-container">
                <div>
                    {isSignUpActive && <legend>Sign Up</legend>}
                    {!isSignUpActive && <legend>Sign In</legend>}
                </div>
                <ul>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" onChange={handleEmailChange} />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                        />
                    </li>
                </ul>

                {isSignUpActive && (
                    <button type="button" id='sign' onClick={handleSignUp}>
                        Sign Up
                    </button>
                )}
                {!isSignUpActive && (
                    <button type="button" id='sign' onClick={handleSignIn}>
                        Sign In
                    </button>
                )}
                <div className="links">
                    {isSignUpActive && <a onClick={handleMethodChange} id="login">Already have an account? Login</a>}
                    {!isSignUpActive && (
                        <a onClick={handleMethodChange} id='login'>New user? Create an account</a>
                    )}
                </div>
            </form>
        </section>
    );
};

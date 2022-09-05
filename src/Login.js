import { Box, Button, Divider } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import "./css/login.css"
import { loginuser } from './features/userSlice';
import { auth } from './firebase';
import firebase from 'firebase';
function Login() {

    const [signup, setSignUp] = useState(false);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const register = (e) => {
        e.preventDefault();

        if (!name) {
            return alert("Name is required.")
        }



        if (!email) {
            return alert("Email is required.")
        }

        if (!password) {
            return alert("Password is required.")
        }

        auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: photoURL
            }).then(() => {
                dispatch(loginuser({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    photoURL: photoURL || "",
                    displayName: name,
                    experience: [],
                    education: [
                    ],
                    certifications: [
                    ],
                }))
            })
        }).catch(error => alert(error));

        setName("");
        setPhotoURL("");
        setEmail("");
        setPassword("");
    }

    const signIn = (e) => {
        e.preventDefault();
        if (!email) {
            return alert("Email is required.")
        }

        if (!password) {
            return alert("Password is required.")
        }


        auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(loginuser({
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL || "",
                displayName: user.displayName,
                experience: [],
                education: [
                ],
                certifications: [
                ],
            }))
        }).catch(error => alert(error))

    }


    var provider = new firebase.auth.GoogleAuthProvider();

    const googleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
                console.log(user);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }






    return (
        <>
            <Box style={{ backgrounColor: "white" }}>
                <div className="loginScreen">
                    <img src="https://www.seekpng.com/png/detail/371-3715298_advertise-on-linkedin-linkedin-logo-no-background.png" />

                    {
                        signup === true ? (
                            <form onSubmit={register}>
                                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                                <input type="submit" value="Sign Up" />
                                <Box sx={{ my: 3 }}>Or</Box>
                                <Button onClick={googleSignIn} variant='outlined' fullWidth >Login with google</Button>

                                <h4>Already a member ? <span onClick={e => setSignUp(false)}>Login Here</span></h4>
                            </form>)
                            :
                            (
                                <form onSubmit={signIn}>
                                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                                    <input type="submit" value="Sign In" />

                                    <Box sx={{ my: 3 }}>Or</Box>
                                    <Button onClick={googleSignIn} variant='outlined' fullWidth >Login with google</Button>
                                    <h4>Not a member ? <span onClick={e => setSignUp(true)}>Register Here</span></h4>

                                </form>
                            )
                    }




                </div>
            </Box>
        </>
    )
}

export default Login

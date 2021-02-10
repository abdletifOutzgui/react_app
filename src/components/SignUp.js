import React, { useState } from 'react'
import axios from "axios"

const SignUp = (props) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    
    const registerUser = e => {
        e.preventDefault();

        if (!email || !password || !name || !passwordConfirmation) {
            return alert("all fields are required !")
        }
    
        const user = {
            name : name,
            email : email,
            password : password,
            password_confirmation : passwordConfirmation
        }
        axios.post("http://127.0.0.1:8000/api/register", user)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("access_token", res.data.token)
                props.history.push("/dashboard") 
            })
            .catch(err => console.log(err.message))

        initalizeState();
    }
    const initalizeState = () => {
        setName("")
        setEmail("")
        setPassword("")
        setPasswordConfirmation("")
    }

    return (

        <div className="container my-5">

            <form onSubmit={registerUser}>
                <div className="form-group">
                    <label htmlFor="name">Name :</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={name}
                        onChange={ e => setName(e.target.value)}
                        className="form-control" 
                        placeholder="Your name..." 
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail :</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                        className="form-control" 
                        placeholder="Your e-mail..." 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password :</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                        className="form-control" 
                        placeholder="Your Password..." 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirmation">Password Confirmation:</label>
                    <input 
                        type="password" 
                        name="passwordConfirmation" 
                        id="passwordConfirmation" 
                        value={passwordConfirmation}
                        onChange={ e => setPasswordConfirmation(e.target.value)}
                        className="form-control" 
                        placeholder="Confirmation Password..." 
                    />
                </div>

                <button className="btn btn-primary btn-block">Sign Up</button>      
            </form>         
        </div>
    )
}

export default SignUp;

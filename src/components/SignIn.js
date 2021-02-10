import React, { useState } from 'react'
import axios from "axios";


const SignIn = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const login = e => {

        e.preventDefault();

        if (!email || !password) {
            alert("all fields are required !")
        }

        const user = {
            email : email,
            password : password
        }
        axios.post("http://127.0.0.1:8000/api/login", user)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("access_token", res.data.token)
                props.history.push("/dashboard") 
            })
            .catch(err => console.log(err.message))

        initalizeState();
    }
    const initalizeState = () => {
        setEmail("")
        setPassword("")
    }

    return (

        <div className="container my-5">

            <form onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="email">E-mail :</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                        className="form-control" 
                        placeholder="Your e-mail..." 
                        autoFocus
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

                <button className="btn btn-secondary btn-block">Sign In</button>      
            </form>         
        </div>
    )
}

export default SignIn;

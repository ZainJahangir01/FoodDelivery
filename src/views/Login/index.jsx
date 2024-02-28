import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/loginUser', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                })
            });

            // Check if the response was successful
            if (!response.ok) {
                // Handle HTTP errors, e.g., display an error message to the user
                console.error("Login failed with status: ", response.status);
                // Optionally, parse and display error message from response
                const errorData = await response.json();
                console.error("Error details: ", errorData);
                alert("Invalid login")
                // Stop execution to prevent navigating to '/'
                return;
            }

            const data = await response.json();
            console.log(data);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    return (
        <>
            <div className="container mt-3">
                <form onSubmit={login}>


                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={handleChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Login</button>
                    <Link to='/signup' className='m-3 btn btn-danger'>Click to signup?</Link>
                </form>
            </div>
        </>
    )
}

export default Login

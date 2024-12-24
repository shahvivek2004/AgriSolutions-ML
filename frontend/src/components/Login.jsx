import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../AuthContext';

const API_URL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const Login = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserData } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [err, setErr] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const signedIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, formData);
            setIsAuthenticated(true);
            setUserData(response.data.user);
            setFormData({
                username: '',
                password: '',
            });
            navigate("/home");
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
            setErr(error.response?.data?.error || "Login Failed, Please check your Username and Password!");
        }
    };


    return (
        <div className="Login">
            <h1>Sign in</h1>
            <a href={`${API_URL}/auth/google`} className="google-button">
                <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                Sign In with Google
            </a>
            <p>Or use your account</p>
            {err && <p style={{ color: 'red', fontWeight: 500 }}>{err}</p>}
            <form onSubmit={signedIn}>
                <input
                    type="email"
                    name="username"
                    placeholder="Email"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button className="submit-button" type="submit">SIGN IN</button>
            </form>
            <p className="Linkva">Don't have an account? <Link to="/register">Sign Up here</Link></p>
        </div>
    );
};

export default Login;

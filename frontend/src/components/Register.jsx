import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:4000";
axios.defaults.withCredentials = true;

const Register = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const Registered = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/register`, formData);
            setFormData({
                username: '',
                email: '',
                password: '',
            });

            if (response.data.newUser) {
                alert(response.data.message);
                navigate("/login");
            } else {
                setErr(response.data.message);
            }
        } catch (error) {
            setErr("Registration failed, please try again");
        }
    };

    

    return (
        <div className="Login">
            <h1>Sign up</h1>
            <a href={`${API_URL}/auth/google`} className="google-button">
                <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                Sign Up with Google
            </a>
            <p>Or create your account</p>
            {err && <p style={{ color: 'red', fontWeight: 500 }}>{err}</p>}
            <form onSubmit={Registered}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button className="submit-button" type="submit">REGISTER</button>
            </form>
            <p className='Linkva'>Already have an account? <Link to="/login">Sign In here</Link></p>
        </div>
    );
}

export default Register;

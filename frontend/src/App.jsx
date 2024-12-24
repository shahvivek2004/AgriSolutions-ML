import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cropsys from './components/cropSys'; // New component
import Fertsys from './components/fertSys';// New component
import Cropdis from './components/cropDis';
import Live from './components/liveOption';
import Dashboard from './components/Dashboard';
// import ThirdComponent from './components/ThirdComponent'; // New component

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<PrivateRoute component={Login} redirectTo="/home" />} />
                    <Route path="/register" element={<PrivateRoute component={Register} redirectTo="/home" />} />
                    <Route path="/home" element={<ProtectedRoute component={Home} redirectTo="/login" />} />
                    <Route path="/cropsys" element={<ProtectedRoute component={Cropsys} redirectTo="/login" />} />
                    <Route path="/fertsys" element={<ProtectedRoute component={Fertsys} redirectTo="/login" />} />
                    <Route path="/cropdis" element={<ProtectedRoute component={Cropdis} redirectTo="/login" />} />
                    <Route path="/liveopt" element={<ProtectedRoute component={Live} redirectTo="/login" />} />
                    <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} redirectTo="/login" />} />
                    {/* <Route path="/third" element={<ProtectedRoute component={ThirdComponent} redirectTo="/login" />} /> */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path='*' element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

const PrivateRoute = ({ component: Component, redirectTo }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return <div>Loading...</div>;
    return isAuthenticated ? <Navigate to={redirectTo} /> : <Component />;
};

const ProtectedRoute = ({ component: Component, redirectTo }) => {
    const { isAuthenticated, isLoading, userData } = useAuth();
    if (isLoading) return <div>Loading...</div>;
    return isAuthenticated ? <Component user={userData} /> : <Navigate to={redirectTo} />;
};

export default App;

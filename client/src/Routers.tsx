import React from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import AppWrapper from './components/AppWrapper/AppWrapper';
import AddUser from './pages/AddUser/AddUser';
import Users from './pages/Users/Users';
import Clients from './pages/Clients/Clients';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/Forgot-Password/ForgotPassword';
import Login from './pages/Login/Login';
import AddEditProject from './pages/Projects/AddEditProject/AddEditProject';
import ProjectDetail from './pages/Projects/ProjectDetail/ProjectDetail';
import Projects from './pages/Projects/Projects';
import Register from './pages/Register/Register';
import SetPassword from './pages/Set-Password/SetPassword';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NonPrivateRoute from './components/PrivateRoute/NonPrivateRoute';


const Routers: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path='/login' element={<Login />}></Route> */}
                <Route 
                    path="/login" 
                    element={<NonPrivateRoute><Login /></NonPrivateRoute>} 
                />
                <Route 
                    path="/register" 
                    element={<NonPrivateRoute><Register /></NonPrivateRoute>} 
                />
                <Route 
                    path="/forgot-password" 
                    element={<NonPrivateRoute><ForgotPassword /></NonPrivateRoute>} 
                />
                <Route 
                    path="/set-password" 
                    element={<NonPrivateRoute><SetPassword /></NonPrivateRoute>} 
                />

                <Route path='/' element={<AppWrapper />}>
                    <Route 
                        path="/dashboard" 
                        element={<PrivateRoute><Dashboard /></PrivateRoute>} 
                    />
                    <Route 
                        path="/clients" 
                        element={<PrivateRoute><Clients /></PrivateRoute>} 
                    />
                    <Route 
                        path="/projects" 
                        element={<PrivateRoute><Projects /></PrivateRoute>} 
                    />
                    <Route 
                        path="/users" 
                        element={<PrivateRoute><Users /></PrivateRoute>} 
                    />
                    <Route 
                        path="/add-user" 
                        element={<PrivateRoute><AddUser /></PrivateRoute>} 
                    />
                    <Route
                        path='/add-new-project'
                        element={<PrivateRoute><AddEditProject page='add' /></PrivateRoute>}
                    ></Route>
                    <Route
                        path='/edit-project'
                        element={<PrivateRoute><AddEditProject page='edit' /></PrivateRoute>}
                    ></Route>
                    <Route
                        path='/project-detail'
                        element={<PrivateRoute><ProjectDetail /></PrivateRoute>}
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;

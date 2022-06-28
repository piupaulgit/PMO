import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppWrapper from './components/AppWrapper/AppWrapper';
import AddUser from './pages/AddUser/AddUser';
import Clients from './pages/Clients/Clients';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/Forgot-Password/ForgotPassword';
import Login from './pages/Login/Login';
import AddNewProject from './pages/Projects/AddNewProject/AddNewProject';
import ProjectDetail from './pages/Projects/ProjectDetail/ProjectDetail';
import Projects from './pages/Projects/Projects';
import Register from './pages/Register/Register';
import SetPassword from './pages/Set-Password/SetPassword';

const Routers: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
				<Route path="forgot-password" element={<ForgotPassword />}></Route>
				<Route path="set-password" element={<SetPassword />}></Route>

                <Route path='/' element={<AppWrapper />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/clients' element={<Clients />}></Route>
                    <Route path='/projects' element={<Projects />}></Route>
                    <Route path='/add-user' element={<AddUser />}></Route>
                    <Route
                        path='/add-new-project'
                        element={<AddNewProject />}
                    ></Route>
                    <Route
                        path='/project-detail'
                        element={<ProjectDetail />}
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;

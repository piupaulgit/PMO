import React from 'react';
import './Sidenav.scss';
import logo from '../../assets/images/full--logo.png';
import { Nav } from 'react-bootstrap';
import {
    FileEarmarkMedical,
    HouseDoor,
    PersonBoundingBox,
} from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';

const Sidenav: React.FC = () => {
    const location = useLocation();
    console.log(location.pathname, 'path');
    return (
        <div className='sidenav text-white bg-dark position-fixed'>
            <div className='navbar-brand-box p-3'>
                <img src={logo} alt='sidenav logo' />
            </div>
            <div className='sidebar-menu'>
                <h5 className='menu-title'>menu</h5>
                <Nav>
                    <Nav.Item>
                        <Nav.Link
                            href='/dashboard'
                            className={
                                location.pathname === '/dashboard'
                                    ? 'active'
                                    : ''
                            }
                        >
                            <HouseDoor size={18} />
                            Dashboard
                        </Nav.Link>
                        <Nav.Link
                            href='/clients'
                            className={
                                location.pathname === '/clients' ? 'active' : ''
                            }
                        >
                            <PersonBoundingBox size={18} />
                            Clients
                        </Nav.Link>
                        <Nav.Link
                            href='/projects'
                            className={
                                location.pathname === '/projects'
                                    ? 'active'
                                    : ''
                            }
                        >
                            <FileEarmarkMedical size={18} />
                            Projects
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
};

export default Sidenav;

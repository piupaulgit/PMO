import React from 'react';
import './Sidenav.scss';
import logo from '../../assets/images/full--logo.png';
import { Nav } from 'react-bootstrap';
import {
    FileEarmarkMedical,
    HouseDoor,
    PersonBoundingBox,
    PlusCircle,
} from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';

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
                            as={Link}
                            to='/dashboard'
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
                            as={Link}
                            to='/clients'
                            className={
                                location.pathname === '/clients' ? 'active' : ''
                            }
                        >
                            <PersonBoundingBox size={18} />
                            Clients
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/projects'
                            className={
                                location.pathname === '/projects'
                                    ? 'active'
                                    : ''
                            }
                        >
                            <FileEarmarkMedical size={18} />
                            Projects
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to='/add-user'
                            className={
                                location.pathname === '/add-user'
                                    ? 'active'
                                    : ''
                            }
                        >
                            <PlusCircle size={18} />
                            Add User
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    );
};

export default Sidenav;

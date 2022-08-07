import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Bell, Gear, Person, Power } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Utilities from '../../Services/helpers/utilities';
import AvatarImage from '../AvatarImage/AvatarImage';
import './Header.scss';

interface HeaderProps {
    pageTitle: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const navigate = useNavigate();
    const logOut = () => {
        Utilities.setToken('');
        navigate('/login');
    }
    const username = Utilities.getUsername();
    return (
        <header className='header bg-white py-3 px-4 d-flex justify-content-between position-fixed align-items-center'>
            <h6 className='mb-0'>{props.pageTitle}</h6>
            <Nav className='pmo-dropdown'>
                <NavDropdown
                    title={
                        <div>
                            {/* <img
                                className='thumbnail-image'
                                src='https://via.placeholder.com/50.png/09f/fff'
                                alt='user pic'
                            /> */}
                            {/* <AvatarImage name={username}></AvatarImage> */}
                            {username}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-chevron-down'
                                viewBox='0 0 16 16'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                />
                            </svg>
                        </div>
                    }
                >
                    <Nav.Item>
                        <Nav.Link>
                            <Person className='me-2' /> Profile
                        </Nav.Link>
                        <Nav.Link>
                            <Bell className='me-2' /> Notifications
                        </Nav.Link>
                        <Nav.Link>
                            <Gear className='me-2' /> Settings
                        </Nav.Link>
                        <hr className='m-2' />
                        <Nav.Link onClick={logOut}>
                            <Power className='text-danger me-2' /> Logout
                        </Nav.Link>
                    </Nav.Item>
                </NavDropdown>
            </Nav>
        </header>
    );
};

export default Header;

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
import { IMenuItems, menuItems } from '../../contants/menuItems';
import * as Icons from 'react-bootstrap-icons';

const Sidenav: React.FC = () => {
    const location = useLocation();

    return (
        <div className='sidenav text-white bg-dark position-fixed'>
            <div className='navbar-brand-box p-3'>
                <img src={logo} alt='sidenav logo' />
            </div>
            <div className='sidebar-menu'>
                <h5 className='menu-title'>menu</h5>
                <Nav>
                    {menuItems &&
                        menuItems.map((menu: IMenuItems, index: number) => {
                            return (
                                <Nav.Item key={index}>
                                    <Nav.Link
                                        as={Link}
                                        to={menu.url}
                                        className={
                                            location.pathname === menu.url
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        {menu.label}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                </Nav>
            </div>
        </div>
    );
};

export default Sidenav;

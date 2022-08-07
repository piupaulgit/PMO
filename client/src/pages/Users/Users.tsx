import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Badge,
    Container,
    Nav,
    NavDropdown,
    NavItem,
    Table,
} from 'react-bootstrap';
import {
    Pencil,
    ThreeDots,
    Trash3,
    Check2,
    XLg,
    X,
} from 'react-bootstrap-icons';
import Header from '../../components/Header/Header';
import { getAllUsers, userApprove } from '../../Services/api/auth';
import { toast } from 'react-toastify';

interface IUser {
    name: string;
    email: string;
    role: string;
    status?: string;
}
const Users: React.FC = () => {
    const [allUsers, setAllUsers] = useState<IUser[]>([]);

    const statusChangeHandeler = (email: string, approve: boolean, index: number) => {
        const payload = {
            email,
            approve
        }
        userApprove(payload).then(res => {
            if (res.status) {
                const copyUsers = [...allUsers];
                copyUsers[index].status = 'approved';
                setAllUsers(copyUsers);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        })
    }

    useEffect(() => {
        getAllUsers().then((res) => setAllUsers(res.data));
    }, []);

    return (
        <div className='users'>
            <Header pageTitle='Users'></Header>
            <Container className='p-5 page-content-container'>
                <Table className='pmo-table align-middle'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers &&
                            allUsers.map((user: IUser, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <h4 className='fs-6 mb-0'>
                                                {user.name}
                                            </h4>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            {user.status === 'pending' ? (
                                                <>
                                                    <span
                                                        title='Approve'
                                                        role='button'
                                                    >
                                                        <Check2
                                                            color='royalblue'
                                                            size={21}
                                                            onClick={() => statusChangeHandeler(user.email, true, index)}
                                                        />
                                                    </span>
                                                    <span
                                                        title='Reject'
                                                        role='button'
                                                        className='ms-2'
                                                    >
                                                        <X
                                                            color='red'
                                                            size={26}
                                                            onClick={() => statusChangeHandeler(user.email, false, index)}
                                                        />
                                                    </span>
                                                </>
                                            ) : (
                                                <Badge>{user.status}</Badge>
                                            )}
                                        </td>
                                        <td>
                                            <Nav className='justify-content-center'>
                                                <NavDropdown
                                                    className='pmo-dropdown'
                                                    title={
                                                        <ThreeDots></ThreeDots>
                                                    }
                                                >
                                                    <NavItem>
                                                        <Nav.Link>
                                                            <Pencil className='me-2' />
                                                            Edit
                                                        </Nav.Link>
                                                    </NavItem>
                                                    <NavItem>
                                                        <Nav.Link>
                                                            <Trash3 className='me-2 text-danger' />
                                                            Delete
                                                        </Nav.Link>
                                                    </NavItem>
                                                </NavDropdown>
                                            </Nav>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Users;

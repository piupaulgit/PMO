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
import { Pencil, ThreeDots, Trash3 } from 'react-bootstrap-icons';
import Header from '../../components/Header/Header';
import { getProjects } from '../../Services/api/projectsApi';

interface IProject {
    logo?: string | null;
    title: string;
    client: string;
    description: string;
    budget: number;
    dueDate: string;
    startDate: string;
    status?: string;
    team?: string[];
}
const Projects: React.FC = () => {
    const [allProjects, setAllProjects] = useState<IProject[]>([]);

    useEffect(() => {
        getProjects().then((res) => setAllProjects(res));
    }, []);

    return (
        <div className='projects'>
            <Header pageTitle='Projects'></Header>
            <Container className='p-5 page-content-container'>
                <Table className='pmo-table align-middle'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Project</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Team</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProjects &&
                            allProjects.map(
                                (project: IProject, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{project.logo}</td>
                                            <td>
                                                <h4 className='fs-6 mb-0'>
                                                    {project.title}
                                                </h4>
                                                <small className='fs-6 text-muted'>
                                                    {project.description}
                                                </small>
                                            </td>
                                            <td>{project.dueDate}</td>
                                            <td>
                                                <Badge>{project.status}</Badge>
                                            </td>
                                            <td>Deep</td>
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
                                }
                            )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Projects;

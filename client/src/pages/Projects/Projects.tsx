import React from 'react';
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

interface IProject {
    logo: string | null;
    projectTitle: string;
    projectDescription: string;
    dueDate: string;
    status: string;
    team: string[];
}
const Projects: React.FC = () => {
    const sampleProjectList: IProject[] = [
        {
            logo: 'logo',
            projectTitle: 'New admin Design',
            projectDescription: 'It will be as simple as Occidental',
            dueDate: '15 Oct 2019',
            status: 'in progress',
            team: ['Deep', 'Piu'],
        },
        {
            logo: 'logo',
            projectTitle: 'New admin Design',
            projectDescription: 'It will be as simple as Occidental',
            dueDate: '15 Oct 2019',
            status: 'in progress',
            team: ['Deep', 'Piu'],
        },
        {
            logo: 'logo',
            projectTitle: 'New admin Design',
            projectDescription: 'It will be as simple as Occidental',
            dueDate: '15 Oct 2019',
            status: 'in progress',
            team: ['Deep', 'Piu'],
        },
        {
            logo: 'logo',
            projectTitle: 'New admin Design',
            projectDescription: 'It will be as simple as Occidental',
            dueDate: '15 Oct 2019',
            status: 'in progress',
            team: ['Deep', 'Piu'],
        },
        {
            logo: 'logo',
            projectTitle: 'New admin Design',
            projectDescription: 'It will be as simple as Occidental',
            dueDate: '15 Oct 2019',
            status: 'in progress',
            team: ['Deep', 'Piu'],
        },
    ];
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
                        {sampleProjectList &&
                            sampleProjectList.map(
                                (project: IProject, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{project.logo}</td>
                                            <td>
                                                <h4 className='fs-6 mb-0'>
                                                    {project.projectTitle}
                                                </h4>
                                                <small className='fs-6 text-muted'>
                                                    {project.projectDescription}
                                                </small>
                                            </td>
                                            <td>{project.dueDate}</td>
                                            <td>
                                                <Badge>{project.status}</Badge>
                                            </td>
                                            <td>
                                                {project &&
                                                    project.team.map(
                                                        (
                                                            member: string,
                                                            ind: number
                                                        ) => {
                                                            return (
                                                                <span key={ind}>
                                                                    {member}
                                                                </span>
                                                            );
                                                        }
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
                                }
                            )}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Projects;

import React, { useEffect, useState } from 'react';
import {
    Alert,
    Badge,
    Container,
    Nav,
    NavDropdown,
    NavItem,
    Spinner,
    Table,
} from 'react-bootstrap';
import { Pencil, ThreeDots, Trash3 } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/Header/Header';
import ImageHelper from '../../components/ImageHepler/ImageHelper';
import { IProject, IProjectOrTaskStatus } from '../../interfaces/Project';
import { ISpinner } from '../../interfaces/Spinner';
import {
    deletedProjectFromDb,
    getProjectsFromDb,
} from '../../Services/api/projectsApi';
import Utilities from '../../Services/helpers/utilities';

const Projects: React.FC = () => {
    const [allProjects, setAllProjects] = useState<IProject[]>([]);
    const navigate = useNavigate();
    const [pageSpinner, setPageSpinner] = useState<ISpinner>({
        state: false,
        text: '',
    });

    useEffect(() => {
        const getAllProject = () => {
            setPageSpinner({ state: true, text: 'Loading Projects...' });
            getProjectsFromDb()
                .then((res) =>{setAllProjects(res.data)})
                .catch((err) => console.log(err))
                .finally(() =>
                    setPageSpinner({
                        state: false,
                        text: '',
                    })
                );
        };
        getAllProject();
    }, []);

    const moveToDetailpage = (project: IProject) => {
        navigate(`/project-detail?id=${project._id}`);
    };

    const deleteProject = (projectId: string) => {
        setPageSpinner({ state: true, text: 'Deleting project...' });
        deletedProjectFromDb(projectId)
            .then((res) => {
                if (res.status) {
                    toast.success(res.message);
                    allProjects.filter((item: IProject, index: number) => {
                        if (item._id === projectId) {
                            allProjects.splice(index, 1)
                        }
                    });
                } else {
                    toast.error(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setPageSpinner({ state: false, text: '' });
            });
    };

    return (
        <div className='projects'>
            <Header pageTitle='Projects'></Header>
            <Container className='p-5 page-content-container pos-rel'>
                <Link
                    className='btn btn-primary float-end mb-2 position-relative z-index-1 mt-2 me-2'
                    to='/add-new-project'
                >
                    Add New Project
                </Link>
                {pageSpinner.state && (
                    <span className='spinner-holder'>
                        <Spinner animation='border' />
                        {pageSpinner.text}
                    </span>
                )}
                {allProjects && allProjects?.length > 0 && !pageSpinner.state && (
                    <Table className='pmo-table align-middle'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Project</th>
                                <th>Start Date</th>
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
                                            <tr
                                                key={index}
                                                onClick={() =>
                                                    moveToDetailpage(project)
                                                }
                                                role='button'
                                            >
                                                <td style={{ width: '80px' }}>
                                                    <ImageHelper
                                                        projectDetail={{
                                                            projectId:
                                                                project._id,
                                                            isLogoPresent:
                                                                project.isLogoUploaded,
                                                        }}
                                                    ></ImageHelper>
                                                </td>
                                                <td>
                                                    <h4 className='fs-6 mb-0'>
                                                        {project.title}
                                                    </h4>
                                                    <small className='small-font text-muted'>
                                                        {project.description}
                                                    </small>
                                                </td>
                                                <td>
                                                    {Utilities.getFormatedDate(
                                                        project.startDate
                                                    )}
                                                </td>
                                                <td>
                                                    {Utilities.getFormatedDate(
                                                        project.dueDate
                                                    )}
                                                </td>
                                                <td>
                                                    <Badge
                                                        pill
                                                        className='text-capitalize'
                                                        bg={
                                                            project.status ===
                                                            IProjectOrTaskStatus.inProgress
                                                                ? 'info'
                                                                : project.status ===
                                                                  IProjectOrTaskStatus.onHold
                                                                ? 'secondary'
                                                                : project.status ===
                                                                  IProjectOrTaskStatus.closed
                                                                ? 'danger'
                                                                : project.status ===
                                                                  IProjectOrTaskStatus.new
                                                                ? 'primary'
                                                                : project.status ===
                                                                  IProjectOrTaskStatus.done
                                                                ? 'success'
                                                                : ''
                                                        }
                                                    >
                                                        {project.status}
                                                    </Badge>
                                                </td>
                                                <td>Deep</td>
                                                <td
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <Nav className='justify-content-center'>
                                                        <NavDropdown
                                                            className='pmo-dropdown'
                                                            title={
                                                                <ThreeDots></ThreeDots>
                                                            }
                                                        >
                                                            <NavItem>
                                                                <Nav.Link
                                                                    as={Link}
                                                                    to={`/edit-project?id=${project._id}`}
                                                                >
                                                                    <Pencil className='me-2' />
                                                                    Edit
                                                                </Nav.Link>
                                                            </NavItem>
                                                            <NavItem>
                                                                <Nav.Link
                                                                    onClick={() =>
                                                                        deleteProject(
                                                                            project._id
                                                                        )
                                                                    }
                                                                >
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
                )}
                {allProjects &&
                    allProjects?.length === 0 &&
                    !pageSpinner.state && (
                        <Alert variant='danger'>No Projects Found.</Alert>
                    )}
            </Container>
        </div>
    );
};

export default Projects;

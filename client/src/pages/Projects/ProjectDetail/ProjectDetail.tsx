import React, { useEffect, useState } from 'react';
import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    ListGroup,
    Row,
    Spinner,
} from 'react-bootstrap';
import { Calendar } from 'react-bootstrap-icons';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import ImageHelper from '../../../components/ImageHepler/ImageHelper';
import { IProject, IProjectStatus } from '../../../interfaces/Project';
import { ISpinner } from '../../../interfaces/Spinner';
import { getSingleProjectDetailFromDb } from '../../../Services/api/projectsApi';
import Utilities from '../../../Services/helpers/utilities';

const ProjectDetail: React.FC = () => {
    const [projectIdFromUrl, setProjectIdFromUrl] = useSearchParams();
    const [projectDetail, setProjectDetail] = useState<IProject>(Object);
    const [pageSpinner, setPageSpinner] = useState<ISpinner>({
        state: false,
        text: '',
    });

    useEffect(() => {
        const projectId = projectIdFromUrl.get('id') || '';
        const singleProjectDetail = () => {
            setPageSpinner({ state: true, text: 'Loading Project Detail...' });
            getSingleProjectDetailFromDb(projectId)
                .then((res) => setProjectDetail(res.data))
                .catch((err) => console.log(err))
                .finally(() => {
                    setPageSpinner({ state: false, text: '' });
                });
        };
        singleProjectDetail();
    }, [projectIdFromUrl]);

    return (
        <div className='project-detail'>
            <Header pageTitle='Project Detail'></Header>

            <Container className='p-5 page-content-container'>
                {pageSpinner.state ? (
                    <span className='spinner-holder'>
                        <Spinner animation='border' />
                        {pageSpinner.text}
                    </span>
                ) : (
                    <Row>
                        <div>
                            <Link
                                to={`/edit-project?id=${projectDetail._id}`}
                                className='btn btn-primary mb-2 float-end'
                            >
                                Edit Project
                            </Link>
                        </div>
                        <Col sm='7'>
                            <Card className='p-4 border-0 shadow-none'>
                                <Row>
                                    <Col sm='2'>
                                        <ImageHelper
                                            projectDetail={{
                                                projectId: projectDetail._id,
                                                isLogoPresent:
                                                    projectDetail.isLogoUploaded,
                                            }}
                                        ></ImageHelper>
                                    </Col>
                                    <Col sm='10'>
                                        <Card.Title className='d-flex justify-content-between'>
                                            {projectDetail.title}
                                            <Badge
                                                pill
                                                className='text-capitalize'
                                                bg={
                                                    projectDetail.status ===
                                                    IProjectStatus.inProgress
                                                        ? 'info'
                                                        : projectDetail.status ===
                                                          IProjectStatus.onHold
                                                        ? 'secondary'
                                                        : projectDetail.status ===
                                                          IProjectStatus.closed
                                                        ? 'danger'
                                                        : projectDetail.status ===
                                                          IProjectStatus.new
                                                        ? 'primary'
                                                        : projectDetail.status ===
                                                          IProjectStatus.done
                                                        ? 'success'
                                                        : ''
                                                }
                                            >
                                                {projectDetail.status}
                                            </Badge>
                                        </Card.Title>
                                        <p>{projectDetail.description}</p>
                                    </Col>
                                    <Col sm={12}>
                                        <h5>
                                            <strong>Budget: </strong>{' '}
                                            {projectDetail.budget}
                                        </h5>
                                    </Col>
                                    <Col sm={12} className='mt-3'>
                                        <Row>
                                            <Col sm={6}>
                                                <h6 className='d-flex align-items-center mb-1'>
                                                    <Calendar className='text-primary me-2'></Calendar>
                                                    <strong>Start Date</strong>
                                                </h6>
                                                <p className='mb-0'>
                                                    {Utilities.getFormatedDate(
                                                        projectDetail.startDate
                                                    )}
                                                </p>
                                            </Col>
                                            <Col sm={6}>
                                                <h6 className='d-flex align-items-center mb-1'>
                                                    <Calendar className='text-primary me-2'></Calendar>
                                                    <strong>Due Date</strong>
                                                </h6>
                                                <p className='mb-0'>
                                                    {Utilities.getFormatedDate(
                                                        projectDetail.dueDate
                                                    )}
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col sm='5'>
                            <Card className='p-4 border-0 shadow-none'>
                                <Card.Title>Team Members</Card.Title>
                                <Card.Body className='p-0'>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <img
                                                className='rounded me-2 '
                                                src='https://via.placeholder.com/50.png/09f/fff'
                                                alt='user pic'
                                            />
                                            <h6 className='me-2 d-inline'>
                                                Cras justo odio
                                            </h6>
                                            <Badge bg='info'>
                                                Frontend Dev.
                                            </Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <img
                                                className='rounded me-2 '
                                                src='https://via.placeholder.com/50.png/09f/fff'
                                                alt='user pic'
                                            />
                                            <h6 className='me-2 d-inline'>
                                                Cras justo odio
                                            </h6>
                                            <Badge bg='primary'>
                                                Backend Dev.
                                            </Badge>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <img
                                                className='rounded me-2 '
                                                src='https://via.placeholder.com/50.png/09f/fff'
                                                alt='user pic'
                                            />
                                            <h6 className='me-2 d-inline'>
                                                Cras justo odio
                                            </h6>
                                            <Badge bg='warning'>Designer</Badge>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default ProjectDetail;

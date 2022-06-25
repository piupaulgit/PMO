import React from 'react';
import { Badge, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Calendar } from 'react-bootstrap-icons';
import Header from '../../../components/Header/Header';
import TaskList from '../Tasks/TaskList/TaskList';

const ProjectDetail: React.FC = () => {
    return (
        <div className='project-detail'>
            <Header pageTitle='Project Detail'></Header>
            <Container className='p-5 page-content-container'>
                <Row>
                    <Col sm='7'>
                        <Card className='p-4 border-0 shadow-none'>
                            <Row>
                                <Col sm='2'>
                                    <img
                                        className='rounded'
                                        src='https://via.placeholder.com/50.png/09f/fff'
                                        alt='user pic'
                                    />
                                </Col>
                                <Col sm='10'>
                                    <Card.Title>Project Name</Card.Title>
                                    <p>
                                        To an English person, it will seem like
                                        simplified English, as a skeptical
                                        Cambridge friend of mine told me what
                                        Occidental is. The European languages
                                        are members of the same family. Their
                                        separate existence is a myth. For
                                        science, music, sport, etc
                                    </p>
                                </Col>
                                <Col sm={12}>
                                    <h5>
                                        <strong>Budget: </strong> 12,000
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
                                                08 Sept, 2019
                                            </p>
                                        </Col>
                                        <Col sm={6}>
                                            <h6 className='d-flex align-items-center mb-1'>
                                                <Calendar className='text-primary me-2'></Calendar>
                                                <strong>Due Date</strong>
                                            </h6>
                                            <p className='mb-0'>08 Dec, 2019</p>
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
                                        <Badge bg='info'>Frontend Dev.</Badge>
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
                                        <Badge bg='primary'>Backend Dev.</Badge>
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
                <Row>
                    <TaskList></TaskList>
                </Row>
            </Container>
        </div>
    );
};

export default ProjectDetail;

import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../../../components/Header/Header';

const AddNewProject: React.FC = () => {
    return (
        <div className='add-new-project'>
            <Header pageTitle='Add New Project'></Header>
            <Container className='p-5 page-content-container'>
                <Card className='p-4 border-0 shadow-none'>
                    <Card.Title>Add New Project</Card.Title>
                    <Card.Body className='px-0'>
                        <Form>
                            <Form.Group
                                as={Row}
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label column sm='2'>
                                    Client
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Select aria-label='Default select example'>
                                        <option>Select</option>
                                        <option value='1'>One</option>
                                        <option value='2'>Two</option>
                                        <option value='3'>Three</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label column sm='2'>
                                    Project Name
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control placeholder='Project Name' />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label column sm='2'>
                                    Project Description
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control placeholder='Project Description' />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label column sm='2'>
                                    Logo
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control type='file' />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label column sm='2'>
                                    Project Date
                                </Form.Label>
                                <Col sm='5'>
                                    <Form.Control type='date' />
                                </Col>
                                <Col sm='5'>
                                    <Form.Control type='date' />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label column sm='2'>
                                    Budget
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control placeholder='Budget' />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label column sm='2'>
                                    Attached Files
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control type='file' />
                                </Col>
                            </Form.Group>
                            <Button variant='primary' className='float-end'>
                                Add Project
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AddNewProject;

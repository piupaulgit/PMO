import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Form from 'react-bootstrap/Form';

const AddUser: React.FC = () => {
    return (
        <div className='clients'>
            <Header pageTitle='Clients'></Header>
            <Container className='p-5 page-content-container'>
                <Card className='p-4 border-0 shadow-none'>
                    <Card.Title>Add New User</Card.Title>
                    <Card.Body className='px-0'>
                        <Form>
                            <Form.Group
                                as={Row}
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label column sm='2'>
                                    Name
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control placeholder='Name' />
                                </Col>
                            </Form.Group>
                            <Form.Group className='mb-3' as={Row}>
                                <Form.Label column sm='2'>
                                    Email Address
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control
                                        type='email'
                                        placeholder='Email Address'
                                    />
                                </Col>
                            </Form.Group>
                            <Button variant='primary' className='float-end'>
                                Add User
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AddUser;

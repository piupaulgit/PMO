import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header/Header';

const AddUser: React.FC = () => {
    return (
        <div className='clients'>
            <Header pageTitle='Clients'></Header>
            <Container className='p-5 page-content-container'>
                <Card className='p-4 border-0 shadow-0'>
                    <Card.Title>Add New User</Card.Title>
                    <Card.Body className='px-0'>
                        <Row>
                            <Col md={6}></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AddUser;

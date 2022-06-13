import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { ChatDots, Clock, Person } from 'react-bootstrap-icons';
import Header from '../../components/Header/Header';

const Clients: React.FC = () => {
    return (
        <div className='clients'>
            <Header pageTitle='Clients'></Header>
            <Container>
                <Row>
                    <Col xl={3} sm={6}>
                        <Card className='text-center'>
                            <Card.Img
                                variant='top'
                                src='https://via.placeholder.com/50.png/09f/fff'
                                className='rounded-circle'
                            />
                            <Card.Body>
                                <Card.Title>David McHenry</Card.Title>
                                <Card.Subtitle>UI/UX Designer</Card.Subtitle>
                            </Card.Body>
                            <Card.Footer className='d-flex justify-content-around bg-white py-3'>
                                <Card.Link href='#' className='text-dark'>
                                    <ChatDots size='20' />
                                </Card.Link>
                                <Card.Link href='#' className='text-dark'>
                                    <Clock size='20' />
                                </Card.Link>
                                <Card.Link href='#' className='text-dark'>
                                    <Person size='20' />
                                </Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Clients;

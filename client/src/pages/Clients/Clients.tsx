import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import PersonCard from '../../components/PersonCard/PersonCard';

const Clients: React.FC = () => {
    return (
        <div className='clients'>
            <Header pageTitle='Clients'></Header>
            <Container className='p-5 page-content-container'>
                <Row>
                    <Col xl={3} sm={6}>
                        <PersonCard></PersonCard>
                    </Col>
                    <Col xl={3} sm={6}>
                        <PersonCard></PersonCard>
                    </Col>
                    <Col xl={3} sm={6}>
                        <PersonCard></PersonCard>
                    </Col>
                    <Col xl={3} sm={6}>
                        <PersonCard></PersonCard>
                    </Col>
                    <Col xl={3} sm={6}>
                        <PersonCard></PersonCard>
                    </Col>
                    <Col xl={3} sm={6}>
                        <PersonCard></PersonCard>
                    </Col>
                    <Col xl={3} sm={6}>
                        <PersonCard></PersonCard>
                    </Col>
                    <Col xl={3} sm={6}>
                        <PersonCard></PersonCard>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Clients;

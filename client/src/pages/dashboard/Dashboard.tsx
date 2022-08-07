import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header/Header';

const Dashboard: React.FC = () => {
    return (
        <div className='dashboard'>
            <Header pageTitle='Dashboard'></Header>
            <Container className='p-5 page-content-container'>
                <h4 className='text-center'>Welcome to PMO!</h4>
            </Container>
        </div>
    );
};

export default Dashboard;

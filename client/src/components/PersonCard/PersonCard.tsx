import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { ChatDots, Clock, Person } from 'react-bootstrap-icons';
import Utilities from '../../Services/helpers/utilities';
import AvatarImage from '../AvatarImage/AvatarImage';
import './PersonCard.scss';

const PersonCard: React.FC = () => {
    const username = Utilities.getUsername();
    return (
        <>
            <Card className='text-center person-card border-0 shadow-sm mb-4'>
                <Card.Body className='px-3 py-4'>
                    {/* <Card.Img
                        variant='top'
                        src='https://via.placeholder.com/50.png/09f/fff'
                        className='rounded-circle mb-3'
                    /> */}
                   <AvatarImage name={username}></AvatarImage>
                    <Card.Title>David McHenry</Card.Title>
                    <Card.Subtitle className='text-muted'>
                        UI/UX Designer
                    </Card.Subtitle>
                    <div className='d-flex justify-content-center mt-3 gap-1'>
                        <Badge bg='primary'>Html</Badge>
                        <Badge bg='primary'>Css</Badge>
                        <Badge bg='primary'>Javascript</Badge>
                    </div>
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
        </>
    );
};

export default PersonCard;

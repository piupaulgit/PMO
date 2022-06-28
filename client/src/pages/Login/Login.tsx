import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import loginRegisterGraphic from '../../assets/images/login-register-graphic.png';
import logoSMall from '../../assets/images/logo-small.svg';
import { Link } from 'react-router-dom';
import Utilities from '../../Services/helpers/utilities';

interface ILogin {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [login, setLogin] = useState<ILogin>(Object);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setLogin({ ...login, [name]: value });
    };
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (
            Utilities.isValidateEmail(login.email) &&
            Utilities.isValidatePassword(login.password)
        ) {
            console.log(login);
        }
    };

    return (
        <Container>
            <Row className='justify-content-center align-items-center mt-5 pt-5'>
                <Col sm={10} lg={5}>
                    <Card className='border-0'>
                        <div className='bg-primary bg-opacity-25'>
                            <Row>
                                <Col sm={7}>
                                    <div className='p-4'>
                                        <h5>Welcome Back !</h5>
                                        <p>Sign in to continue to PMO.</p>
                                    </div>
                                </Col>
                                <Col sm={5} className='align-items-end d-flex'>
                                    <img
                                        src={loginRegisterGraphic}
                                        alt='Logoin Register graphic'
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Card.Body className='position-relative p-4'>
                            <div className='auth-logo position-absolute rounded-circle d-inline-block bg-light p-3 mt-3n'>
                                <img src={logoSMall} alt='logo' width='40' />
                            </div>
                            <Form className='pt-5'>
                                <Form.Group
                                    className='mb-3'
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        required
                                        name='email'
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className='mb-3'
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Password'
                                        required
                                        name='password'
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className='mb-3'
                                    controlId='formBasicCheckbox'
                                >
                                    <Form.Check
                                        type='checkbox'
                                        label='Remeber me'
                                    />
                                </Form.Group>
                                <div className='d-grid gap-2'>
                                    <Button
                                        variant='primary'
                                        type='submit'
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                            <div className='text-center mt-3'>
                                <Link to='/forgot-password'>
                                    Forgot your password?
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <p className='text-center mt-5'>
                    Don't have an account ?{' '}
                    <Link to='/register'>Signup Now</Link>
                </p>
            </Row>
        </Container>
    );
};

export default Login;

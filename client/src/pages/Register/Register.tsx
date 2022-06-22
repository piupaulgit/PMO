import React, {useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import loginRegisterGraphic from "../../assets/images/login-register-graphic.png";
import logoSMall from "../../assets/images/logo-small.svg";
import { Link } from "react-router-dom";
import Utilities from "../../Services/helpers/utilities";

interface IRegister {
    name: string,
    email: string,
    role: string
}

const Register: React.FC = () => {
    const [register, setRegister] = useState<IRegister>(Object);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value; 
        setRegister({...register, [name]: value})
    }
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value; 
        setRegister({...register, [name]: value})
    }
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if( 
            Utilities.isNotEmpty(register.name, 'Name') && 
            Utilities.isValidateEmail(register.email) &&
            Utilities.isNotEmpty(register.role, 'Role')
        ) {
            console.log(register)
        }
    }
    
    return (
        <Container>
            <Row className="justify-content-center align-items-center mt-5 pt-5">
                <Col sm={10} lg={5}>
                    <Card className="border-0">
                        <div className="bg-primary bg-opacity-25">
                            <Row>
                                <Col sm={7}>
                                    <div className="p-4">
                                        <h5>Free Register</h5>
                                        <p>Get your free PMO account now.</p>
                                    </div>
                                </Col>
                                <Col sm={5} className="align-items-end d-flex">
                                    <img
                                        src={loginRegisterGraphic}
                                        alt="Logoin Register graphic"
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Card.Body className="position-relative p-4">
                            <div className="auth-logo position-absolute rounded-circle d-inline-block bg-light p-3 mt-3n">
                                <img src={logoSMall} alt="logo" width="40" />
                            </div>
                            <Form className="pt-5">
                                <Form.Group
                                    className="mb-3"
                                >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                >
                                    <Form.Label>Role</Form.Label>

                                    <Form.Select
                                        aria-label="Default select example"
                                        as="select"
                                        name="role"
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="1">Client</option>
                                        <option value="2">Developer</option>
                                        <option value="3">Tester</option>
                                    </Form.Select>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Request for Access
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <p className="text-center mt-5">
                    Already have an account ? <Link to="/login">Login</Link>
                </p>
            </Row>
        </Container>
    );
};

export default Register;

import React, {useEffect, useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import loginRegisterGraphic from '../../assets/images/login-register-graphic.png';
import logoSMall from '../../assets/images/logo-small.svg';
import {Link, useSearchParams, useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import Utilities from "../../Services/helpers/utilities";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {setUserPassword} from '../../Services/api/auth';


interface ISetPassword {
    email: string | null,
    password: string,
    confirmPassword: string
}
interface PasswordRule {
    charectorLimit: boolean,  
    oneNumeric: boolean,
    oneUppercase: boolean,
    oneLowercase: boolean,
}

const SetPassword: React.FC = () => {

    const [setPassword, setSetPassword] = useState<ISetPassword>(Object);
    const [passwordRule, setPasswordRule] = useState<PasswordRule>(Object);
    const [emailParams, setEmailParams] = useSearchParams();
    const navigate = useNavigate();

    const passwordRuleColor = (rule: keyof PasswordRule) => {
        if (!setPassword.password) {
            return {color: 'inherit'}
        }
        return {
            color: passwordRule[rule] ? 'green' : 'red'
        }
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Password must contain</Popover.Header>
          <Popover.Body>
              <ul>
                  <li style={passwordRuleColor('charectorLimit')}>6 to 20 characters</li>
                  <li style={passwordRuleColor('oneNumeric')}>1 Numeric Digit</li>
                  <li style={passwordRuleColor('oneUppercase')}>1 Uppercase</li>
                  <li style={passwordRuleColor('oneLowercase')}>1 Lowercase</li>
              </ul>
          </Popover.Body>
        </Popover>
      );
      
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value; 
        setSetPassword({...setPassword, [name]: value})

        if(name === 'password'){
            const obj: PasswordRule  = {
                charectorLimit: Utilities.isCharectorLimitMatch(value),  
                oneNumeric: Utilities.isOneNumericMatch(value),
                oneUppercase: Utilities.isOneUppercaseMatch(value),
                oneLowercase: Utilities.isOneLowercaseMatch(value),
            }
            setPasswordRule({...obj});
        }

    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if(
            Utilities.isValidatePassword(setPassword.password) &&
            isPasswordMatch(setPassword.password, setPassword.confirmPassword) 
        ){
            const payload = {
                email: setPassword.email,
                password: setPassword.password
            }
            setUserPassword(payload).then(res => {
                console.log(res);
                
                if (res.status) {
                    toast.success(res.message);
                    navigate('/login')
                } else {
                    toast.error(res.message);
                }
            })
        }
    }

    const isPasswordMatch = (password: string, confirmPassword: string) => {
        if (password === confirmPassword) {
            return true;
        } else {
            toast.error("Password didn't match");
        }
    }

    useEffect(() => {
        // const queryString = window.location.search;
        // const urlParams = new URLSearchParams(queryString);
        // const email = urlParams.get('email')
        setSetPassword({...setPassword, ['email']: emailParams.get("email")});
    }, [])
    
    return (
        <Container>
            <Row className="justify-content-center align-items-center mt-5 pt-5">
                <Col sm={10} lg={5}>
                    <Card className="border-0">
                        <div className="bg-primary bg-opacity-25">
                        <Row>
                            <Col sm={7}>
                                <div className="p-4">
                                    <h5>Welcome Back !</h5>
                                    <p>Sign in to continue to PMO.</p>
                                </div>
                            </Col>
                            <Col sm={5} className="align-items-end d-flex">
                                <img src={loginRegisterGraphic} alt="Logoin Register graphic" />
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
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        readOnly
                                        value={setPassword.email || ''}
                                    />
                                </Form.Group>  
                                <Form.Group
                                    className="mb-3"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            required
                                            name="password"
                                            onChange={handleInputChange}
                                        />
                                    </OverlayTrigger>
                                </Form.Group>                   
                                <Form.Group
                                    className="mb-3"
                                >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter confirm password"
                                        required
                                        name="confirmPassword"
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Set Password
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

export default SetPassword;


import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const NewTask: React.FC = () => {
    const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
    return (
        <>
            <Button variant='primary' onClick={() => setShowNewTaskModal(true)}>
                Add New Task
            </Button>
            <Modal
                show={showNewTaskModal}
                size='lg'
                onHide={() => setShowNewTaskModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder='Task Title' />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                placeholder='Task Description'
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select aria-label='Default select example'>
                                        <option>Select</option>
                                        <option value='1'>Bug</option>
                                        <option value='2'>Task</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Assign To</Form.Label>
                                    <Form.Select aria-label='Default select example'>
                                        <option>Select</option>
                                        <option value='1'>Deep</option>
                                        <option value='2'>Piu</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => setShowNewTaskModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant='primary'>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewTask;

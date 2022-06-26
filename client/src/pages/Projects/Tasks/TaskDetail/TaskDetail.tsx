import React from 'react';
import {
    Badge,
    Button,
    Col,
    Form,
    FormGroup,
    Modal,
    Row,
} from 'react-bootstrap';
import { Bug, FileCode } from 'react-bootstrap-icons';
import { ITask, ITaskType } from '../TaskList/TaskList';

interface IProps {
    taskDetail: ITask;
    showDetail: boolean;
    parentCallback: any;
}
const TaskDetail: React.FC<IProps> = (props: IProps) => {
    const hieShowModal = () => {
        props.parentCallback(!props.showDetail);
    };
    return (
        <>
            <Modal show={props.showDetail} size='lg' onHide={hieShowModal}>
                <Modal.Header closeButton>
                    {props.taskDetail.type === ITaskType.bug ? (
                        <Badge bg='danger' className='me-3'>
                            <Bug></Bug>
                        </Badge>
                    ) : (
                        <Badge bg='warning' className='me-3'>
                            <FileCode></FileCode>
                        </Badge>
                    )}
                    <Modal.Title>{props.taskDetail.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{props.taskDetail.description}</p>
                    <Row className='mb-3'>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select>
                                    <option>new</option>
                                    <option>in progress</option>
                                    <option>done</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Assigned To</Form.Label>
                                <Form.Select>
                                    <option>Deep</option>
                                    <option>Piu</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Assigned By</Form.Label>
                                <Form.Select disabled>
                                    <option>Deep</option>
                                    <option>Piu</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'>Close</Button>
                    <Button variant='primary'>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TaskDetail;

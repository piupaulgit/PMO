import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Spinner,
} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../components/Header/Header';
import ImageHelper from '../../../components/ImageHepler/ImageHelper';
import { projectStatus } from '../../../contants/projectStatus';
import { IProject } from '../../../interfaces/Project';
import { ISpinner } from '../../../interfaces/Spinner';
import {
    addNewProjectInDb,
    editProjectInDb,
    getSingleProjectDetailFromDb,
} from '../../../Services/api/projectsApi';

interface IProjectDetail extends IProject {
    formData: any;
}
interface IFieldErrorMessages {
    client: string;
    title: string;
    description: string;
    startDate: string;
    dueDate: string;
    budget: string;
}

interface IProps {
    page: string;
}

const AddEditProject: React.FC<IProps> = (props: IProps) => {
    const [projectIdFromUrl, setProjectIdFromUrl] = useSearchParams();
    const [projectDetail, setProjectDetail] = useState<IProjectDetail>(Object);
    const { formData } = projectDetail;
    const [fieldErrorMessages, setFieldErrorMessages] =
        useState<IFieldErrorMessages>({
            client: '',
            title: '',
            description: '',
            startDate: '',
            dueDate: '',
            budget: '',
        });
    const [pageSpinner, setPageSpinner] = useState<ISpinner>({
        state: false,
        text: '',
    });

    useEffect(() => {
        setProjectDetail({ ...projectDetail, formData: new FormData() });
    }, []);

    useEffect(() => {
        const projectId = projectIdFromUrl.get('id') || '';
        const singleProjectDetail = () => {
            setPageSpinner({ state: true, text: 'Loading Project Detail...' });
            getSingleProjectDetailFromDb(projectId)
                .then((res) =>
                    setProjectDetail({
                        ...projectDetail,
                        title: res.data.title,
                        description: res.data.description,
                        client: res.data.client,
                        logo: '',
                        startDate: res.data.startDate,
                        dueDate: res.data.dueDate,
                        status: res.data.status,
                        _id: res.data._id,
                        isLogoUploaded: res.data.isLogoUploaded,
                        formData: new FormData(),
                    })
                )
                .catch((err) => console.log(err))
                .finally(() => {
                    setPageSpinner({ state: false, text: '' });
                });
        };
        if (props.page === 'edit') {
            singleProjectDetail();
        }
    }, [props.page, projectIdFromUrl]);

    const handleInputChange = (name: string) => (event: any) => {
        const value =
            name === 'logo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setProjectDetail({ ...projectDetail, [name]: value });
        if (value === '') {
            setFieldErrorMessages({
                ...fieldErrorMessages,
                [name]: `${name} is required.`,
            });
        } else {
            setFieldErrorMessages({
                ...fieldErrorMessages,
                [name]: ``,
            });
        }
    };
    const addNewProject = (event: any) => {
        event.preventDefault();
        const isBlank = Object.values(fieldErrorMessages).every(
            (item) => item === ''
        );
        if (!isBlank) {
            toast.error('Please fill all the required inputs.');
        } else {
            setPageSpinner({ state: true, text: 'Saving new project...' });
            addNewProjectInDb(formData)
                .then((res) => {
                    if (res.status) {
                        toast.success(res.message);
                        setProjectDetail({
                            _id: '',
                            logo: '',
                            title: '',
                            client: '',
                            description: '',
                            budget: 0,
                            dueDate: '',
                            startDate: '',
                            isLogoUploaded: false,
                            formData: new FormData(),
                        });
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setPageSpinner({
                        state: false,
                        text: '',
                    });
                });
        }
    };

    const EditProject = (event: any) => {
        event.preventDefault();
        const isBlank = Object.values(fieldErrorMessages).every(
            (item) => item === ''
        );
        if (!isBlank) {
            toast.error('Please fill all the required inputs.');
        } else {
            setPageSpinner({ state: true, text: 'Saving your project...' });
            editProjectInDb(projectDetail._id, formData)
                .then((res) => {
                    if (res.status) {
                        toast.success(res.message);
                        setProjectDetail({
                            _id: '',
                            logo: '',
                            title: '',
                            client: '',
                            description: '',
                            budget: 0,
                            dueDate: '',
                            startDate: '',
                            isLogoUploaded: false,
                            formData: new FormData(),
                        });
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setPageSpinner({
                        state: false,
                        text: '',
                    });
                });
        }
    };

    return (
        <div className='add-new-project'>
            <Header
                pageTitle={
                    props.page === 'add' ? 'Add New Project' : 'Edit Project'
                }
            ></Header>
            <Container className='p-5 page-content-container pos-rel'>
                {pageSpinner.state && (
                    <span className='spinner-holder'>
                        <Spinner animation='border' />
                        {pageSpinner.text}
                    </span>
                )}
                <Card className='p-4 border-0 shadow-none'>
                    <Card.Title>
                        {props.page === 'add'
                            ? 'Add New Project'
                            : 'Edit Project'}
                    </Card.Title>
                    <Card.Body className='px-0'>
                        <Form>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column sm='2'>
                                    Client<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Select
                                        aria-label='Select Client'
                                        onChange={handleInputChange('client')}
                                        value={projectDetail.client}
                                    >
                                        <option value=''>Select</option>
                                        <option value='Prima Di'>
                                            Prima Di
                                        </option>
                                        <option value='Himani'>Himani</option>
                                    </Form.Select>
                                    {fieldErrorMessages.client && (
                                        <p className='text-danger my-2 text-capitalize'>
                                            {fieldErrorMessages.client}
                                        </p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column sm='2'>
                                    Title
                                    <span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control
                                        placeholder='Project Title'
                                        onChange={handleInputChange('title')}
                                        value={projectDetail.title}
                                    />
                                    {fieldErrorMessages.title && (
                                        <p className='text-danger my-2 text-capitalize'>
                                            {fieldErrorMessages.title}
                                        </p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column sm='2'>
                                    Description
                                    <span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control
                                        placeholder='Project Description'
                                        onChange={handleInputChange(
                                            'description'
                                        )}
                                        value={projectDetail.description}
                                    />
                                    {fieldErrorMessages.description && (
                                        <p className='text-danger my-2 text-capitalize'>
                                            {fieldErrorMessages.description}
                                        </p>
                                    )}
                                </Col>
                            </Form.Group>
                            {props.page === 'edit' && (
                                <Form.Group as={Row} className='mb-3'>
                                    <Form.Label column sm='2'>
                                        Status
                                    </Form.Label>
                                    <Col sm='10'>
                                        <Form.Select
                                            value={projectDetail.status}
                                        >
                                            {projectStatus.map(
                                                (
                                                    status: string,
                                                    index: number
                                                ) => {
                                                    return (
                                                        <option
                                                            value={status}
                                                            key={index}
                                                        >
                                                            {status}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            )}
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column sm='2'>
                                    Logo<span className='text-danger'>*</span>
                                </Form.Label>
                                {props.page === 'edit' && (
                                    <Col sm='5'>
                                        <ImageHelper
                                            projectDetail={{
                                                projectId: projectDetail._id,
                                                isLogoPresent:
                                                    projectDetail.isLogoUploaded,
                                            }}
                                        ></ImageHelper>
                                    </Col>
                                )}
                                <Col sm='5'>
                                    <Form.Control
                                        type='file'
                                        onChange={handleInputChange('logo')}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column sm='2'>
                                    Project Date
                                    <span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm='5'>
                                    <Form.Control
                                        type='date'
                                        value={projectDetail.startDate}
                                        onChange={handleInputChange(
                                            'startDate'
                                        )}
                                    />
                                    {fieldErrorMessages.startDate && (
                                        <p className='text-danger my-2 text-capitalize'>
                                            {fieldErrorMessages.startDate}
                                        </p>
                                    )}
                                </Col>
                                <Col sm='5'>
                                    <Form.Control
                                        type='date'
                                        value={projectDetail.dueDate}
                                        onChange={handleInputChange('dueDate')}
                                    />
                                    {fieldErrorMessages.dueDate && (
                                        <p className='text-danger my-2 text-capitalize'>
                                            {fieldErrorMessages.dueDate}
                                        </p>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3'>
                                <Form.Label column sm='2'>
                                    Budget<span className='text-danger'>*</span>
                                </Form.Label>
                                <Col sm='10'>
                                    <Form.Control
                                        placeholder='Budget'
                                        type='number'
                                        onChange={handleInputChange('budget')}
                                        value={projectDetail.budget}
                                    />
                                    {fieldErrorMessages.budget && (
                                        <p className='text-danger my-2 text-capitalize'>
                                            {fieldErrorMessages.budget}
                                        </p>
                                    )}
                                </Col>
                            </Form.Group>
                            {props.page === 'add' ? (
                                <Button
                                    variant='primary'
                                    className='float-end'
                                    type='submit'
                                    onClick={addNewProject}
                                >
                                    Add Project
                                </Button>
                            ) : (
                                <Button
                                    variant='primary'
                                    className='float-end'
                                    type='submit'
                                    onClick={EditProject}
                                >
                                    Edit Project
                                </Button>
                            )}
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AddEditProject;

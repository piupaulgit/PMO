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
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    logo: string;
    dueDate: string;
    budget: string;
}

interface IProps {
    page: string;
}

const AddEditProject: React.FC<IProps> = (props: IProps) => {
    const [projectIdFromUrl, setProjectIdFromUrl] = useSearchParams();
    const [projectDetail, setProjectDetail] = useState<IProjectDetail>({
        _id: '',
        logo: '',
        title: '',
        client: '',
        description: '',
        budget: 0,
        dueDate: '',
        startDate: '',
        isLogoUploaded: false,
        formData: '',
    });
    const { formData } = projectDetail;
    const [fieldErrorMessages, setFieldErrorMessages] =
        useState<IFieldErrorMessages>(Object);
    const [pageSpinner, setPageSpinner] = useState<ISpinner>({
        state: false,
        text: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const projectId = projectIdFromUrl.get('id') || '';
        const singleProjectDetail = () => {
            setPageSpinner({ state: true, text: 'Loading Project Detail...' });
            getSingleProjectDetailFromDb(projectId)
                .then((res) =>
                    setProjectDetail((prev) => ({
                        ...prev,
                        title: res.data.title,
                        description: res.data.description,
                        client: res.data.client,
                        logo: 'logo',
                        startDate: res.data.startDate,
                        dueDate: res.data.dueDate,
                        status: res.data.status,
                        _id: res.data._id,
                        budget: res.data.budget,
                        isLogoUploaded: res.data.isLogoUploaded,
                        formData: new FormData(),
                    }))
                )
                .catch((err) => console.log(err))
                .finally(() => {
                    setPageSpinner({ state: false, text: '' });
                });
        };
        if (props.page === 'edit') {
            singleProjectDetail();
        } else {
            setProjectDetail((prev) => ({ ...prev, formData: new FormData() }));
        }
    }, [props.page, projectIdFromUrl]);

    const handleInputChange = (name: string) => (event: any) => {
        const value =
            name === 'logo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setProjectDetail({ ...projectDetail, [name]: value });

        if (fieldErrorMessages[name as keyof IFieldErrorMessages]) {
            setFieldErrorMessages({ ...fieldErrorMessages, [name]: '' });
        }
    };

    const validateForm = () => {
        const { client, title, description, startDate, dueDate, budget } =
            projectDetail;

        const newErrors: IFieldErrorMessages = {
            client: '',
            title: '',
            description: '',
            startDate: '',
            logo: '',
            dueDate: '',
            budget: '',
        };

        Object.keys(newErrors).map((item: string) => {
            if (
                !projectDetail[item as keyof IFieldErrorMessages] &&
                projectDetail[item as keyof IFieldErrorMessages]?.toString()
                    .length === 0
            ) {
                newErrors[
                    item as keyof IFieldErrorMessages
                ] = `Please enter ${item
                    .replace(/([A-Z])/g, ' $1')
                    .trim()} of the project`;
            }
        });

        return newErrors;
    };
    const addNewProject = (event: any) => {
        event.preventDefault();
        const formErrors: IFieldErrorMessages = validateForm();
        if (Object.values(formErrors).every((x) => x === null || x === '')) {
            setPageSpinner({ state: true, text: 'Saving new project...' });
            addNewProjectInDb(formData)
                .then((res) => {
                    if (res.status) {
                        toast.success(res.message);
                        setEmptyForm();
                        navigate('/projects');
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
        } else {
            setFieldErrorMessages(formErrors);
        }
    };

    const EditProject = (event: any) => {
        event.preventDefault();
        const formErrors: IFieldErrorMessages = validateForm();
        if (Object.values(formErrors).every((x) => x === null || x === '')) {
            setPageSpinner({ state: true, text: 'Saving your project...' });
            editProjectInDb(projectDetail._id, formData)
                .then((res) => {
                    if (res.status) {
                        toast.success(res.message);
                        navigate('/projects');
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
        } else {
            setFieldErrorMessages(formErrors);
        }
    };

    const setEmptyForm = () => {
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
                                        isInvalid={Boolean(
                                            fieldErrorMessages.client
                                        )}
                                    >
                                        <option value=''>Select</option>
                                        <option value='Prima Di'>
                                            Prima Di
                                        </option>
                                        <option value='Himani'>Himani</option>
                                    </Form.Select>
                                    <Form.Control.Feedback
                                        className='small-font text-uppercase'
                                        type='invalid'
                                    >
                                        {fieldErrorMessages.client}
                                    </Form.Control.Feedback>
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
                                        isInvalid={Boolean(
                                            fieldErrorMessages.title
                                        )}
                                    />
                                    <Form.Control.Feedback
                                        className='small-font text-uppercase'
                                        type='invalid'
                                    >
                                        {fieldErrorMessages.title}
                                    </Form.Control.Feedback>
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
                                        isInvalid={Boolean(
                                            fieldErrorMessages.description
                                        )}
                                    />
                                    <Form.Control.Feedback
                                        className='small-font text-uppercase'
                                        type='invalid'
                                    >
                                        {fieldErrorMessages.description}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            {props.page === 'edit' && (
                                <Form.Group as={Row} className='mb-3'>
                                    <Form.Label column sm='2'>
                                        Status
                                    </Form.Label>
                                    <Col sm='10'>
                                        <Form.Select
                                            onChange={handleInputChange(
                                                'status'
                                            )}
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
                                {props.page === 'add' && (
                                    <Col sm={10}>
                                        <Form.Control
                                            type='file'
                                            onChange={handleInputChange('logo')}
                                            isInvalid={Boolean(
                                                fieldErrorMessages.logo
                                            )}
                                        />
                                        <Form.Control.Feedback
                                            className='small-font text-uppercase'
                                            type='invalid'
                                        >
                                            {fieldErrorMessages.logo}
                                        </Form.Control.Feedback>
                                    </Col>
                                )}
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
                                        isInvalid={Boolean(
                                            fieldErrorMessages.startDate
                                        )}
                                    />
                                    <Form.Control.Feedback
                                        className='small-font text-uppercase'
                                        type='invalid'
                                    >
                                        {fieldErrorMessages.startDate}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm='5'>
                                    <Form.Control
                                        type='date'
                                        value={projectDetail.dueDate}
                                        onChange={handleInputChange('dueDate')}
                                        isInvalid={Boolean(
                                            fieldErrorMessages.dueDate
                                        )}
                                    />
                                    <Form.Control.Feedback
                                        className='small-font text-uppercase'
                                        type='invalid'
                                    >
                                        {fieldErrorMessages.dueDate}
                                    </Form.Control.Feedback>
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
                                        isInvalid={Boolean(
                                            fieldErrorMessages.budget
                                        )}
                                    />
                                    <Form.Control.Feedback
                                        className='small-font text-uppercase'
                                        type='invalid'
                                    >
                                        {fieldErrorMessages.budget}
                                    </Form.Control.Feedback>
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

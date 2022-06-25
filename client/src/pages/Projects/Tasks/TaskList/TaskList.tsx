import React, { useState } from 'react';
import {
    Badge,
    Button,
    Card,
    Nav,
    NavDropdown,
    NavItem,
    Table,
} from 'react-bootstrap';
import {
    Bug,
    FileCode,
    Pencil,
    ThreeDots,
    Trash2,
} from 'react-bootstrap-icons';
import NewTask from '../NewTask/NewTask';

enum ITaskStatus {
    new = 'new',
    inProgress = 'inProgress',
    done = 'done',
    rejected = 'rejected',
    closed = 'closed',
}
enum ITaskType {
    task = 'task',
    bug = 'bug',
}
interface ITask {
    title: string;
    description: string;
    type: ITaskType;
    assignedTo: string;
    assignedBy: string;
    status: ITaskStatus;
    createdDate: Date;
    dueDate: Date;
}
const tasksSample: ITask[] = [
    {
        title: 'Header name not matching',
        description: 'header name not matching after reload',
        type: ITaskType.bug,
        assignedBy: 'Deep',
        assignedTo: 'Piu',
        status: ITaskStatus.new,
        createdDate: new Date(),
        dueDate: new Date(),
    },
    {
        title: 'Header name not matching',
        description: 'header name not matching after reload',
        type: ITaskType.task,
        assignedBy: 'Deep',
        assignedTo: 'Piu',
        status: ITaskStatus.inProgress,
        createdDate: new Date(),
        dueDate: new Date(),
    },
];

const TaskList: React.FC = () => {
    return (
        <div className='task-list mt-4'>
            <div className='d-flex justify-content-between'>
                <h3>Tasks</h3>
                <NewTask></NewTask>
            </div>
            <Table className='pmo-table align-middle'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Assigned By</th>
                        <th>Assigned To</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksSample &&
                        tasksSample.map((task: ITask, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>
                                        {task.type === ITaskType.bug ? (
                                            <Bug className='text-danger'></Bug>
                                        ) : (
                                            <FileCode className='text-warning'></FileCode>
                                        )}
                                    </td>
                                    <td>
                                        <h6 className='fs-6 mb-0'>
                                            {task.title}
                                        </h6>
                                    </td>
                                    <td>
                                        {task.status === ITaskStatus.new ? (
                                            <Badge bg='info'>
                                                {task.status}
                                            </Badge>
                                        ) : task.status ===
                                          ITaskStatus.inProgress ? (
                                            <Badge bg='warning'>
                                                {task.status}
                                            </Badge>
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                    <td>{task.assignedBy}</td>
                                    <td>{task.assignedTo}</td>
                                    <td>{task.dueDate.toDateString()}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
};

export default TaskList;

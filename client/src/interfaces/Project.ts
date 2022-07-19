export enum IProjectOrTaskStatus {
    inProgress = 'in progress',
    new = 'new',
    closed = 'closed',
    onHold = 'on hold',
    done = 'done',
}

export enum IPriority{
    low = 'low',
    medium = "medium",
    high = "high"
}

export enum ITaskType {
    task = 'task',
    bug = "bug"
}
export interface IProject {
    _id: string;
    logo?: string | null;
    title: string;
    client: string;
    description: string;
    budget: number;
    dueDate: string;
    startDate: string;
    status?: IProjectOrTaskStatus;
    team?: string[];
    isLogoUploaded: boolean;
    taskDetails?: ITask[]
}

export interface ITask {
    _id: string;
    title: string;
    description: string;
    project: string;
    dueDate: string;
    priority: IPriority;
    status: string;
    type: ITaskType;
    developer: string | 'unassigned';
    createdBy: string
    // createdBy: string;
}
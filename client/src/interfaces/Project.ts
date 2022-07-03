export enum IProjectStatus {
    inProgress = 'in progress',
    new = 'new',
    closed = 'closed',
    onHold = 'on hold',
    done = 'done',
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
    status?: IProjectStatus;
    team?: string[];
    isLogoUploaded: boolean;
}
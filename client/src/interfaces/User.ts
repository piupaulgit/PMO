export interface IUser{
    _id: string,
    email: string,
    password: string,
    name: string,
    role: string,
    status: string,
}

export interface IUserDropdown {
    label: string,
    id: string
}
import { StringifyOptions } from "querystring"

export interface IMenuItems {
    label: string,
    url: string,
    icon: string
}

export const menuItems:IMenuItems[] =[
    {
        label: 'Dashboard',
        url: '/dashboard',
        icon: 'house-door'

    },{
        label: 'Clients',
        url:'/clients',
        icon:'person'
    },{
        label:'Projects',
        url:'/projects',
        icon: 'file-earmark-check'
    },{
        label:'Add User',
        url:'/add-user',
        icon:'plus-circle'
    }
]
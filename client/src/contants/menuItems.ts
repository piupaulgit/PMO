export interface IMenuItems {
    label: string,
    url: string,
    icon: string
}

export const menuItems: IMenuItems[] =[
    {
        label: 'Dashboard',
        url: '/dashboard',
        icon: ''

    },{
        label: 'Clients',
        url:'/clients',
        icon:'HouseDoor'
    },{
        label:'Projects',
        url:'/projects',
        icon: 'HouseDoor'
    },{
        label:'Users',
        url:'/users',
        icon:'PlusCircle'
    },{
        label:'Add User',
        url:'/add-user',
        icon:'PlusCircle'
    },{
        label: 'Add New Project',
        url:'/add-new-project',
        icon:'Add'
    }
]
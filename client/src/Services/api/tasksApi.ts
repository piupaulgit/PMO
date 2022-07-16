import axios from 'axios';
import { API_URL } from '../../backend';
const url = 'task';


export const addNewTaskInDb = (payload: any) => {
    return axios
    .post(`${API_URL}/${url}/create`, payload)
    .then((res) => {
        return res.data
    })
    .catch((err) => err);
}

export const editTaskInDb = (taskId: string,payload: any) => {
    return axios
    .put(`${API_URL}/${url}/${taskId}`, payload)
    .then((res) => {
        return res.data
    })
    .catch((err) => err);
}


export const deleteTaskFromDb = (taskId: string) => {
    return axios
    .delete(`${API_URL}/${url}/${taskId}`)
    .then((res) => {
        return res.data
    })
    .catch((err) => err);
}
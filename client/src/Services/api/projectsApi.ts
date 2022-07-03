import axios from 'axios';
import { API_URL } from '../../backend';
const url = 'project';

export const getProjectsFromDb = () => {
    return axios
        .get(`${API_URL}/${url}/all`)
        .then((res) => res.data)
        .catch((err) => err);
};

export const getSingleProjectDetailFromDb = (projectId: string) => {
    return axios
    .get(`${API_URL}/${url}/${projectId}`)
    .then((res) => res.data)
    .catch((err) => err);
}

export const addNewProjectInDb = (formData: any) => {
    return axios
    .post(`${API_URL}/${url}/create`, formData)
    .then((res) => {
        return res.data
    })
    .catch((err) => err);
}

export const editProjectInDb = (projectId: string, formData:any) => {
    return axios
    .put(`${API_URL}/${url}/${projectId}`, formData)
    .then((res) => {
        return res.data
    })
    .catch((err) => err);
}

export const deletedProjectFromDb = (projectId: string) => {
    return axios
    .delete(`${API_URL}/${url}/${projectId}`)
    .then((res) => {
        return res.data
    })
    .catch((err) => err);
}
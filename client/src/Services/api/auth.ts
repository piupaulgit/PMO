import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../../backend';
import AuthHeader from '../helpers/auth-header';
const url = 'auth';


export const userLogin = (payload: object) => {
    return axios
        .post(`${API_URL}/${url}/login`, payload)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const setUserPassword = (payload: object) => {
    return axios
        .post(`${API_URL}/${url}/set-password`, payload)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const userApprove = (payload: object) => {
    return axios
        .post(`${API_URL}/${url}/approve`, { headers: AuthHeader() }, payload)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const userRegistration = (payload: object) => {
    return axios
        .post(`${API_URL}/${url}/signup`, payload)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const getAllUsers = () => {
    return axios
        .get(`${API_URL}/${url}/users`, {headers: AuthHeader()})
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

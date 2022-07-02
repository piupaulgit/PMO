import axios from 'axios';
import { API_URL } from '../../backend';
const url = 'project';

export const getProjects = () => {
    return axios
        .get(`${API_URL}/${url}/all`)
        .then((res) => res.data.data)
        .catch((err) => err);
};

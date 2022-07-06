import axios from 'axios';
import { API_URL } from '../../backend';
import AuthHeader from '../helpers/auth-header';

const url = 'project';

export const getProjects = () => {
    return axios
        .get(`${API_URL}/${url}/all`, { headers: AuthHeader() })
        .then((res) => res.data.data)
        .catch((err) => err);
};

import Utilities from './utilities';

const AuthHeader = (): any => {
    const getToken: string | null = Utilities.getToken();
    if (getToken) {
        return { Authorization: 'Bearer ' + getToken, 'Content-Type': 'application/json', };
    } else {
        return { Authorization: 'Bearer ' + getToken, 'Content-Type': 'application/json', };
    }
}
export default AuthHeader;
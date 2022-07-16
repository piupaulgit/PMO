import Utilities from './utilities';

const AuthHeader = (): any => {
    const getToken: string | null = Utilities.getToken();
    if (getToken) {
        return { Authorization: 'Bearer ' + getToken };
    } else {
        return { Authorization: 'Bearer ' + getToken };
    }
}
export default AuthHeader;
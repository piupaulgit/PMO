import { toast } from "react-toastify";

const Utilities =  {
    isValidateEmail: (email: string) => {
        const isValid = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (isValid) {
            return true
        } else {
            toast.error("Please enter correct Email");
            return
        }
    },
    isValidatePassword: (password: any) => {
        // 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password.match(passwordPattern)) {
            return true
        } else {
            toast.error("Please enter correct password");
            return
        }
    },
    isNotEmpty: (str: string = '', fieldName: string) : boolean => {
        if (str.match(/\S/)) {
            return true
        } else {
            toast.error(`${fieldName} is Required`);
            return false;
        }
    },
    isCharectorLimitMatch: (str: string): boolean => {
        if(str.match(/^.{6,20}$/)){
            return true;
        }
        return false;
    },
    isOneNumericMatch: (str: string): boolean => {
        if(str.match(/.*[0-9].*/)){
            return true;
        }
        return false;
    },
    isOneUppercaseMatch: (str: string): boolean => {
        if(str.match(/.*[A-Z].*/)){
            return true;
        }
        return false;
    },
    isOneLowercaseMatch: (str: string): boolean => {
        if(str.match(/.*[a-z].*/)){
            return true;
        }
        return false;
    }
}

export default Utilities;
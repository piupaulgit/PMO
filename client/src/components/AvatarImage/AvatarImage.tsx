import React from "react";

const AvatarImage: React.FC<any> = (props: {name: string, size?: string}) => {

    const getAvatarName = (fullName: string) => {
        let avatarName = '';
        const name = fullName?.split(' ')?.slice(0, 2);
        name?.map((nm: string) => {
            avatarName += nm.substring(1, 0);
        })
        return avatarName;
    }
    

    return (
        <span className={`avatar me-3 text-uppercase ${props.size}`} title={props.name}>
            {getAvatarName(props.name)}
        </span>
    );
};

export default AvatarImage;
import React from "react";

const AvatarImage: React.FC<any> = (props: any) => {

    const getAvatarName = (fullName: string) => {
        let avatarName = '';
        const name = fullName?.split(' ')?.slice(0, 2);
        name?.map((nm: string) => {
            avatarName += nm.substring(1, 0);
        })
        return avatarName;
    }
    

    return (
        <span className="avatar me-3">
            {getAvatarName(props.name)}
        </span>
    );
};

export default AvatarImage;
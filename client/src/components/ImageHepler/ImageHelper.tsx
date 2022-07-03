import React from 'react';
import defaultLogoImage from '../../assets/images/default_logo.jpg';
import { API_URL } from '../../backend';
import './ImageHelper.scss';

interface IProp {
    projectDetail: {
        projectId: string;
        isLogoPresent: boolean;
    };
}
const ImageHelper: React.FC<IProp> = (props: IProp) => {
    const projectImageUrl =
        props.projectDetail.projectId && props.projectDetail.isLogoPresent
            ? `${API_URL}/project/logo/${props.projectDetail.projectId}`
            : defaultLogoImage;

    return (
        <span>
            <img
                src={projectImageUrl}
                alt='Project Logo'
                className='project-logo'
            />
        </span>
    );
};

export default ImageHelper;

import React from 'react';
import styled from 'styled-components';

const StyledAuthorWrapper = styled.div`
    background: rgba(0, 0, 0, 0.5);
`;
const SingleImage = ({ url, isFav, author }) => {
    const style = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '250px',
    };
    return (
        <div style={style}>
            {isFav}
            <StyledAuthorWrapper>{author}</StyledAuthorWrapper>
        </div>
    );
};

export default SingleImage;

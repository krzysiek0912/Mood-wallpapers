import React from 'react';
import PropTypes from 'prop-types';
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
        height: '30vh',
    };
    return (
        <div style={style}>
            {isFav}
            <StyledAuthorWrapper>{author}</StyledAuthorWrapper>
        </div>
    );
};
SingleImage.propTypes = {
    url: PropTypes.string.isRequired,
    isFav: PropTypes.bool,
    author: PropTypes.string.isRequired,
};
SingleImage.defaultProps = {
    isFav: false,
};

export default SingleImage;

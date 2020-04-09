import React from 'react';
import PropTypes from 'prop-types';

const MainTheme = ({ children }) => (
    <>
        <div className="content-wrapper">{children}</div>
    </>
);

MainTheme.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default MainTheme;

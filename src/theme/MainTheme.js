import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const MainTheme = ({ children }) => (
    <>
        <Header />
        <div className="content-wrapper">{children}</div>
    </>
);

MainTheme.propTypes = {
    children: PropTypes.element.isRequired,
};

export default MainTheme;

import React from 'react';
import Header from './Header';

const MainTheme = ({ children }) => (
    <>
        <Header />
        <div className="content-wrapper">{children}</div>
    </>
);

export default MainTheme;

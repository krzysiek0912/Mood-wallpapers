import React from 'react';
import styled from 'styled-components';
import SettingSidebar from '../components/features/SettingSidebar/SettingSidebar';

const StyledWrapperHeader = styled.div`
    padding: 0 40px 15px;
`;
const StyledH1 = styled.h1`
    padding: 0;
    margin: 0;
    text-align: center;
    color: gray;
`;
const Header = () => {
    return (
        <StyledWrapperHeader>
            <StyledH1>Mood wallpapers</StyledH1>
            <SettingSidebar />
        </StyledWrapperHeader>
    );
};

export default Header;

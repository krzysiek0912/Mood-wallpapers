import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetRequestObj, getErrorRequest } from '../redux/requestRedux';
import Navbar from './Navbar';
import SettingSidebar from '../components/features/SettingSidebar/SettingSidebar';
import Notification from '../components/common/Notification/Notification';

const StyledWrapperHeader = styled.div`
    padding: 0 40px 15px;
`;

const StyledErrorWrapper = styled.div`
    position: fixed;
    top: 10px;
    left: 15%;
    width: 70%;
    z-index: 9999;
`;
const Header = (props) => {
    const { errors, resetRequest } = props;
    const notyfications = errors.map((error) => (
        <Notification key={error} type="danger" closeAction={resetRequest}>
            {error}
        </Notification>
    ));
    return (
        <>
            <StyledErrorWrapper>{notyfications}</StyledErrorWrapper>
            <StyledWrapperHeader>
                <Navbar />
                <SettingSidebar />
            </StyledWrapperHeader>
        </>
    );
};
Header.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    resetRequest: PropTypes.func.isRequired,
};
Header.defaultProps = {
    errors: [],
};

const mapStateToProps = (state) => ({
    errors: getErrorRequest(state),
});
const mapDispatchToProps = (dispatch) => ({
    resetRequest: () => dispatch(resetRequestObj()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetRequestObj, getErrorRequest } from '../redux/requestRedux';
import SettingSidebar from '../components/features/SettingSidebar/SettingSidebar';
import Notification from '../components/common/Notification/Notification';

const StyledWrapperHeader = styled.div`
    padding: 0 40px 15px;
`;
const StyledH1 = styled.h1`
    padding: 0;
    margin: 0;
    text-align: center;
    color: gray;
`;
const Header = (props) => {
    const { errors, resetRequest } = props;
    const notyfications = errors.map((error) => (
        <Notification type="danger" closeAction={resetRequest}>
            {error}
        </Notification>
    ));
    return (
        <StyledWrapperHeader>
            <StyledH1 className="h1">Mood wallpapers</StyledH1>
            <Link to="/">Home</Link>
            <Link to="/favorite">Home</Link>
            <SettingSidebar />
            {notyfications}
        </StyledWrapperHeader>
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

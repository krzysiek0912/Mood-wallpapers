import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Notification from '../../common/Notification/Notification';
import { getFavoriesList } from '../../../redux/favoriteReedux';
import SingleImage from '../../common/SingleImage/SingleImage';

const StyledListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
`;

const FavorieList = ({ favories }) => {
    const list = favories.map((image) => {
        return <SingleImage key={image.id} image={image} isFavorite />;
    });
    return list.length > 0 ? (
        <StyledListWrapper>{list}</StyledListWrapper>
    ) : (
        <Notification type="primary">
            No favorite wallpapers, go to <Link to="/">homepage</Link>
        </Notification>
    );
};
FavorieList.propTypes = {
    favories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            urls: PropTypes.shape({
                regular: PropTypes.string,
            }),
            altDescription: PropTypes.string,
            author: PropTypes.string,
            term: PropTypes.string,
        }),
    ).isRequired,
};

const mapStateToProps = (state) => ({
    favories: getFavoriesList(state),
});

export default connect(mapStateToProps)(FavorieList);

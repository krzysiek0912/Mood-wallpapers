import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getFavories } from '../../../redux/favoriteReedux';
import SingleImage from '../../common/SingleImage/SingleImage';

const StyledListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
`;

const FavorieList = ({ favories }) => {
    const list = favories.map((image) => {
        return <SingleImage key={image.id} image={image} />;
    });
    return <StyledListWrapper>{list}</StyledListWrapper>;
};
const mapStateToProps = (state) => ({
    favories: getFavories(state),
});

export default connect(mapStateToProps)(FavorieList);

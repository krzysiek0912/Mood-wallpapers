import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SingleImage from '../../common/SingleImage/SingleImage';
import { getFavIds } from '../../../redux/favoriteReedux';
import { loadImagesRequest, getImages, getSearchString } from '../../../redux/imagesRedux';

const StyledImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
`;

class SearchResults extends Component {
    componentDidMount() {
        const { loadImages, searchString } = this.props;
        loadImages(searchString);
    }

    render() {
        const { images, favIds } = this.props;

        const imgs = images
            ? images.map((image) => {
                  const isFav = favIds.includes(image.id);
                  return <SingleImage key={image.id} isFavorite={isFav} image={image} />;
              })
            : null;
        return (
            <>
                <StyledImagesContainer>{imgs}</StyledImagesContainer>
            </>
        );
    }
}

SearchResults.propTypes = {
    searchString: PropTypes.string.isRequired,
    loadImages: PropTypes.func.isRequired,
    favIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            urls: PropTypes.shape({
                regular: PropTypes.string,
            }),
            altDescription: PropTypes.string,
            author: PropTypes.string,
        }),
    ).isRequired,
};
const mapStateToProps = (state) => ({
    favIds: getFavIds(state),
    images: getImages(state),
    searchString: getSearchString(state),
});
const mapDispatchToProps = (dispatch) => ({
    loadImages: (term) => dispatch(loadImagesRequest(term)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

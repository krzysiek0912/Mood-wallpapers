import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SingleImage from '../../common/SingleImage/SingleImage';
import { loadDefaultImagesRequest, getImages, getSearchString } from '../../../redux/imagesRedux';

const StyledImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
`;

class SearchResults extends Component {
    componentDidMount() {
        const { loadDefaultImages, searchString } = this.props;
        loadDefaultImages(searchString);
    }

    render() {
        const { images } = this.props;

        const imgs = images
            ? images.map((image) => {
                  return <SingleImage key={image.id} image={image} />;
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
    loadDefaultImages: PropTypes.func.isRequired,
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
    images: getImages(state),
    searchString: getSearchString(state),
});
const mapDispatchToProps = (dispatch) => ({
    loadDefaultImages: () => dispatch(loadDefaultImagesRequest()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

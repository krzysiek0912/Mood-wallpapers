import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SingleImage from '../../common/SingleImage/SingleImage';
import { loadImagesRequest, getImages } from '../../../redux/imagesRedux';

const StyledImagesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
`;

class SearchResults extends Component {
    componentDidMount() {
        const { loadImages } = this.props;
        loadImages();
    }

    render() {
        const { images } = this.props;
        const imgs = images.map((img) => {
            const { id, urls, altDescription, author } = img;
            return (
                <SingleImage
                    key={id}
                    id={id}
                    url={urls.regular}
                    alt={altDescription}
                    author={author}
                />
            );
        });
        return (
            <>
                <StyledImagesContainer>{imgs}</StyledImagesContainer>
            </>
        );
    }
}

SearchResults.propTypes = {
    loadImages: PropTypes.func.isRequired,
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
});
const mapDispatchToProps = (dispatch) => ({
    loadImages: () => dispatch(loadImagesRequest()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

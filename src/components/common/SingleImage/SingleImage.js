import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToFavRequest, removeFromFavRequest } from '../../../redux/favoriteReedux';

const StyledAuthor = styled.h2`
    position: absolute;
    width: 100%;
    font-size: 25px;
    top: 50%;
    text-align: center;
    color: white;
`;
const StyledContentWrapper = styled.div`
    color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;
const StyledIconWrapper = styled.div`
    display: inline-block;
    font-size: 45px;
    color: #c40100;
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
`;
const StyledImageWrapper = styled.div`
    height: calc(50vh-65px);
`;

class SingleImage extends Component {
    state = {
        isFavorite: false,
        image: {},
    };

    componentDidMount() {
        const { image, isFavorite = false } = this.props;
        const { id, urls, altDescription, author, term } = image;

        this.setState({
            image: {
                id,
                urls,
                altDescription,
                author,
                term,
            },
            isFavorite,
        });
    }

    changeFav = () => {
        this.setState(
            (prevState) => ({
                isFavorite: !prevState.isFavorite,
            }),
            () => {
                const { image, isFavorite } = this.state;
                const { addToFav, removeFromFav } = this.props;
                if (isFavorite) {
                    addToFav(image);
                } else {
                    removeFromFav(image.id);
                }
            },
        );
    };

    render() {
        const { image } = this.props;
        const { urls, author, term } = image;
        const { regular } = urls;
        const style = {
            backgroundImage: `url(${regular})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '45vh',
            position: 'relative',
        };
        const { isFavorite } = this.state;
        return (
            <StyledImageWrapper style={style}>
                <StyledContentWrapper>
                    {term}
                    <StyledIconWrapper onClick={this.changeFav}>
                        {!isFavorite && <FaRegHeart />}
                        {isFavorite && <FaHeart />}
                    </StyledIconWrapper>
                    <StyledAuthor>{author}</StyledAuthor>
                </StyledContentWrapper>
            </StyledImageWrapper>
        );
    }
}

SingleImage.propTypes = {
    isFavorite: PropTypes.bool,
    addToFav: PropTypes.func.isRequired,
    removeFromFav: PropTypes.func.isRequired,
    image: PropTypes.shape({
        id: PropTypes.string,
        urls: PropTypes.shape({
            regular: PropTypes.string,
        }),
        altDescription: PropTypes.string,
        author: PropTypes.string,
        term: PropTypes.string,
    }).isRequired,
};
SingleImage.defaultProps = {
    isFavorite: false,
};

const mapDispatchToProps = (dispatch) => ({
    addToFav: (image) => dispatch(addToFavRequest(image)),
    removeFromFav: (id) => dispatch(removeFromFavRequest(id)),
});

export default connect(null, mapDispatchToProps)(SingleImage);

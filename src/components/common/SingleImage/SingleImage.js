import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToFavRequest } from '../../../redux/favoriteReedux';

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
    position: relative;
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
        const { image } = this.props;
        const { id, urls, altDescription, author, term } = image;
        const isFavorite = false;
        this.setState({
            image: {
                id,
                urls,
                altDescription,
                author,
                term,
                isFavorite,
            },
        });
    }

    changeFav = () => {
        this.setState(
            (prevState) => ({
                isFavorite: !prevState.isFavorite,
            }),
            () => {
                const { image } = this.state;
                const { addToFav } = this.props;
                addToFav(image);
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
    urls: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    addToFav: (image) => dispatch(addToFavRequest(image)),
});

export default connect(null, mapDispatchToProps)(SingleImage);

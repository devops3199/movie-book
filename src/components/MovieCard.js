import React from 'react';
import styled from 'styled-components';
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MoiveCard = (props) => {
    const { margin, title, url, rate, _onClick } = props;

    const styles = {
        margin : margin,
    };

    return(
        <Movie {...styles} onClick={_onClick}>
            <Detail>
                <FontAwesomeIcon icon={faSearch} />
            </Detail>
            <Poster url={url} />
            <Title>
                <span>{title}</span>
                <span>{rate}</span>
            </Title>
        </Movie>
    );
};

MoiveCard.defaultProps = {
    title : '서복',
    rate : 9,
    url : 'https://movie-phinf.pstatic.net/20210308_97/1615182990261ekXlL_JPEG/movie_image.jpg',
};


const Movie = styled.div`
    position: relative;
    width: 15.625rem;
    height: 24.815rem;
    background-color: #1a1f3f;
    cursor: pointer;
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
    border-radius: 10px;
`;

const Poster = styled.div`
    width: 100%;
    height: 21.565rem;
    margin-right: 1.25rem;
    background: url(${(props) => (props.url)}) no-repeat center;
    background-size: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const Title = styled.div`
    width: 100%;
    height: 3.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & span {
        margin: 0 0.5rem;
        font-weight: 700;
    }
`;

const Detail = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(238, 58, 87, .3);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .5s;

    & svg {
        font-size: 2rem;
    }

    :hover {
        opacity: 1;
    }
`;

export default MoiveCard;
import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
    const { width, height, padding, name, rank, url } = props;

    const styles = {
        width: width,
        height: height,
        padding: padding,
        name : name,
        url : url,
    };

    return (
        <CardContainer {...styles}>
            <TitleBackground {...styles}>
                <span>서복 (2021)</span>
                <span>4.5/5</span>
            </TitleBackground>
            <Rank {...styles}>
                <span>{rank}</span>
            </Rank>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    position: relative;
    grid-area: ${(props) => props.name};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
    cursor: pointer;
    background: url(https://img.hankyung.com/photo/202011/BF.24364787.1.jpg) no-repeat center;
    background-size: cover;
    border-radius: 10px;

    @media only screen and (max-width: 1300px) {
        width: ${(props) => (props.name === 'main' ? '20rem;' : '10rem')};
        height: ${(props) => (props.name === 'main' ? '30rem;' : ' ')};
    }
`;

const Rank = styled.div`
    position: absolute;
    top: 6px;
    left: 6px;
    width: ${(props) => (props.name === 'main' ? '50px;' : '25px;')};
    height: ${(props) => (props.name === 'main' ? '50px;' : '25px;')};
    background-color: #ee3a57;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
        font-size: ${(props) => (props.name === 'main' ? '1rem' : '.8rem;')};
        font-weight: ${(props) => (props.name === 'main' ? '700' : '500')};
    }
`;

const TitleBackground = styled.div`
    position: absolute;
    bottom: -10%;
    height: 15%;
    width: 100%;
    background-color: rgba(57, 50, 50, .85);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: bottom .5s, opacity .3s;

    & span {
        font-size: ${(props) => (props.name === 'main' ? '2.5rem;' : '1.1rem;')};
        font-weight: 700;
        margin: 0 1rem;

        @media only screen and (max-width: 1300px) {
            font-size: ${(props) => (props.name === 'main' ? '1.1rem;' : '.7rem;')};
        }
    }

    ${CardContainer}:hover &{
        bottom: 0;
        opacity: 1;
    }
`;

export default Card;
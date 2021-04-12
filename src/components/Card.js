import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
    const { width, height, margin } = props;

    const styles = {
        width: width,
        height: height,
        margin: margin,
    };

    return (
        <CardContainer {...styles}>
            Card
        </CardContainer>
    );
};

const CardContainer = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
    border: 1px solid #fff;
`;

export default Card;
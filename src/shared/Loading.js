import React from "react";
import styled, {keyframes}  from 'styled-components';
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Loading = (props) => {
    return (
        <Container>
            <FontAwesomeIcon icon={faSpinner} />
        </Container>
    );
};

const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
        font-size: 4rem;
        animation: ${spin} 2s linear infinite;
    }
`;

export default Loading;
import React from 'react';
import styled from 'styled-components';
import SearchResult from 'components/SearchResult';

const Result = (props) => {

    return(
        <ResultContainer>
            <ResultText>
                <span>전체 검색 결과</span>
            </ResultText>
            <SearchResult />
        </ResultContainer>
    );
};

const ResultContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 700px;
    height: 100%;
    margin: 0 auto;
`;

const ResultText = styled.div`
    text-align: center;
    margin 3rem 0;

    & span {
        font-size: 1.25rem;
        font-weight: 700;
    }
`;


export default Result;
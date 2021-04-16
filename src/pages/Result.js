import React from 'react';
import styled from 'styled-components';
import InfinityScroll from 'shared/InfinityScroll';
import MoiveCard from 'components/MovieCard';
import { actionCreators as movieActions } from 'redux/modules/movie';
import { useSelector, useDispatch } from 'react-redux';

const Result = (props) => {
    const dispatch = useDispatch();
    const search_list = useSelector((state) => state.movie.search);

    const scroll = () => {
        console.log("데이터 가져오기");
    };

    React.useEffect(() => {
        dispatch(movieActions.getMoiveSearch('아', 0));
    }, []);

    return(
        <ResultContainer>
            <ResultText>
                <span>"서복" 검색 결과</span>
                <br/>
                <span>총 {search_list.length}개</span>
            </ResultText>
            <MovieList>
                <InfinityScroll
                    callNext={scroll}
                    is_next={true}
                >
                    {search_list.map((val, index) => {
                        let full_title = `${val.title} (${val.opening_date})`;

                        return(
                            <MoiveCard margin='1rem 1.25rem' key={index} title={full_title} url={val.image_url} />
                        );
                    })}
                </InfinityScroll>
            </MovieList>
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

const MovieList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
`;


export default Result;
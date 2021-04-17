import React from 'react';
import styled from 'styled-components';
import InfinityScroll from 'shared/InfinityScroll';
import MoiveCard from 'components/MovieCard';
import { actionCreators as movieActions } from 'redux/modules/movie';
import { useSelector, useDispatch } from 'react-redux';

const SearchResult = (props) => {
    const dispatch = useDispatch();
    const search_list = useSelector((state) => state.movie.search.content);
    const is_last = useSelector((state) => state.movie.search.last);

    const history = props.history;

    const scroll = () => {
        dispatch(movieActions.getMoiveScroll());
    };

    return (
        <MovieList>
            <InfinityScroll
                callNext={scroll}
                is_next={is_last}
            >
                {search_list.map((val, index) => {
                    let full_title = `${val.title} (${val.opening_date})`;

                    return(
                        <MoiveCard margin='1rem 1.25rem' key={index} title={full_title} url={val.image_url} rate={val.rate} _onClick={() => {history.push(`/detail/${val.m_id}`);}} />
                    );
                })}
            </InfinityScroll>
        </MovieList>
    );
};

const MovieList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
`;

export default SearchResult;
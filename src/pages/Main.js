import React from 'react';
import styled from 'styled-components';
import Carousel from 'components/Carousel';
import Card from 'components/Card';
import { actionCreators as movieActions } from 'redux/modules/movie';
import { useSelector, useDispatch } from 'react-redux';

const Main = (props) => {
    const dispatch = useDispatch();
    const movie_list = useSelector((state) => state.movie.list);
    const collection_list = useSelector((state) => state.movie.movie_collection);
    const {history} = props;

    React.useEffect(() => {
        dispatch(movieActions.getMoiveToday());
        dispatch(movieActions.getMovieCollection());
    }, []);

    return (
        <MainContainer>
            <Title>
                <h3>오늘의 영화</h3>
            </Title>
            <CardContainer>
                {movie_list.map((val, index) => {
                    let full_title = `${val.title} (${val.opening_date})`;

                    if(index === 0){
                        return (
                            <Card name='main' url={val.image_url} title={full_title} rate={val.rate} width='33.5rem' height='50rem' rank={index+1} key={index} _onClick={() => {history.push(`/detail/${val.m_id}`);}} />
                        );
                    }
                    return (
                        <Card name={`sub${index}`} url={val.image_url} title={full_title} rate={val.rate} width='15.625rem' rank={index+1} key={index} _onClick={() => {history.push(`/detail/${val.m_id}`);}} />
                    );
                })}
            </CardContainer>
            {Object.entries(collection_list).map((val, index) => {
                return(
                    <React.Fragment key={index}>
                        <Title>
                            <h3>{val[0]}님의 영화 리스트 ({val[1].length}편)</h3>
                        </Title>
                        <Carousel list={val[1]} history={history} />
                    </React.Fragment>
                );
            })}
        </MainContainer>
    );
};

const Title = styled.div`
    width: 100%;
    margin-top: 3rem;
`;

const MainContainer = styled.div`
    width: 100%;
    margin: 0 auto;
`;

const CardContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-areas:
        'main sub1 sub2 sub3'
        'main sub4 sub5 sub6';
    grid-gap: 1rem;
    margin: 0 auto 50px auto;

    @media only screen and (max-width: 1300px) {
        width: 90%;
    }
`;


export default Main;
import React from 'react';
import styled from 'styled-components';
import Carousel from 'components/Carousel';
import Card from 'components/Card';

const Main = (props) => {
    const today_list = new Array(7).fill(0);
    const today_user = ['abc123', 'xyz333', 'hezzs', 'dazy'];
    return (
        <MainContainer>
            <Title>
                <h3>오늘의 영화</h3>
            </Title>
            <CardContainer>
                {today_list.map((val, index) => {
                    if(index === 0){
                        return (
                            <Card name='main' width='33.5rem' height='33.5rem' rank={index+1}></Card>
                        );
                    }
                    return (
                        <Card name={`sub${index}`} width='15.625rem' rank={index+1}></Card>
                    );
                })}
            </CardContainer>
            {today_user.map((val, index) => {
                return(
                    <>
                        <Title key={index}>
                            <h3>{val}님의 영화 리스트</h3>
                        </Title>
                        <Carousel />
                    </>
                );
            })}
        </MainContainer>
    );
};

const Title = styled.div`
    width: 100%;
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
    margin-bottom: 50px;
`;


export default Main;
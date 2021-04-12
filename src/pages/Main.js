import React from 'react';
import styled from 'styled-components';
import Carousel from 'components/Carousel';
import Card from 'components/Card';

const Main = (props) => {
    return (
        <MainContainer>
            <Title>
                <h3>오늘의 영화</h3>
            </Title>
            <CardContainer>
                <Left>
                    <Card width='500px' height='500px'></Card>
                </Left>
                <Right>
                    <Card width='230px' height='230px' margin='0 1rem 1rem 0'></Card>
                    <Card width='230px' height='230px' margin='0 1rem 1rem 0'></Card>
                    <Card width='230px' height='230px' margin='0 1rem 1rem 0'></Card>
                    <Card width='230px' height='230px' margin='0 1rem 1rem 0'></Card>
                    <Card width='230px' height='230px' margin='0 1rem 1rem 0'></Card>
                    <Card width='230px' height='230px' margin='0 1rem 1rem 0'></Card>
                </Right>
            </CardContainer>
            <Title>
                <h3>홍길동님의 영화 리스트</h3>
            </Title>
            <Carousel />
            <Title>
                <h3>김철수님의 영화 리스트</h3>
            </Title>
            <Carousel />
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
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Left = styled.div`
    margin-right: 20px;
`;

const Right = styled.div`
    display: flex;
    flex-wrap: wrap;
`;


export default Main;
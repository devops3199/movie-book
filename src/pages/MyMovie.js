import React from 'react';
import styled from 'styled-components';
import MyMovieCard from 'components/MyMovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as myMovieActions } from 'redux/modules/mymovie';

const MyMovie = () => {

  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  

//   React.useEffect(() => {
//     dispatch(myMovieActions.getMovieAPI(u_id));
//   }, []);

  return (
    <Wrap>
      <Title>내 영화 리스트</Title>
      <CardBox>
        <MyMovieCard/>
        <MyMovieCard/>
      </CardBox>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 700px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 2.4rem;
`;

const CardBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  border: 0;
`;

export default MyMovie;
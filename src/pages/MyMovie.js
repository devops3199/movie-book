import React from 'react';
import styled from 'styled-components';
import MyMovieCard from 'components/MyMovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as collectionActions } from 'redux/modules/collection';
import Permit from "shared/Permit";

const MyMovie = (props) => {
  const dispatch = useDispatch();
  const {history} = props;
  const has_token = localStorage.getItem('token');
  const user_info = JSON.parse(localStorage.getItem("userInfo"));
  const movie_list = useSelector((state) => state.collection.list);

  React.useEffect(() => {
    if (has_token) {
      dispatch(collectionActions.getMovieCollectionAPI(user_info.u_id));
    }
  }, []);

  return (
    <Permit>
      <Wrap>
        <Title>내 영화 리스트</Title>
        <CardBox>
            {movie_list.map((m, idx) => {
                return <MyMovieCard _onClick={() => {history.push(`/detail/${m.mid}`);}} key={idx} {...m} />;
            })}
        </CardBox>
        </Wrap>
    </Permit>
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
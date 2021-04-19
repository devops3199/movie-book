import React from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Star from "elements/Star";
import Review from "components/Review";

import { actionCreators as movieActions } from 'redux/modules/movie';
import { useSelector, useDispatch } from 'react-redux';

const Detail = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  const movie_detail = useSelector((state) => state.movie.detail);
  const movie_comment = useSelector((state) => state.movie.comment.list);
  const comment_pages = useSelector((state) => state.movie.comment.total_page);
  const pages = new Array(comment_pages).fill(0);

  const [reviewContent, setReviewContent] = React.useState(null);
  const [reviewStar, setReviewStar] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const GetPage = (e) => {
    setCurrentPage(parseInt(e.target.text));
  }; 

  const makeReview = () => {
    if(reviewContent === null && reviewStar === null) {
      alert("내용을 입력해주세요.");
      return;
    }

    if(reviewContent === null) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    if(reviewStar === null) {
      alert("별점을 선택해주세요.");
      return;
    }

    const obj = {
      m_id : id,
      rate : reviewStar,
      content : reviewContent,
    };

    dispatch(movieActions.addComment(obj));
  };

  const addCollection = () => {
    console.log('리스트 추가');
  };
  
  React.useEffect(() => {
    dispatch(movieActions.getMovieDetail(id));
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    dispatch(movieActions.getMovieComment(id, currentPage));
  }, [currentPage]);

  return(
      <Wrap>
        <MovieImg url={movie_detail.image_url}></MovieImg>
        <TitleBox>
          <Title>{movie_detail.title}</Title>
          <Info1>
            <Y>{movie_detail.opening_date}</Y>
            <RunTime>{movie_detail.running_time}</RunTime>
          </Info1>
          <Limit>{movie_detail.grade}</Limit>
          <StarBox>
            <StarOne><FontAwesomeIcon icon={faStar} /></StarOne>
            <StarNum>{movie_detail.rate}</StarNum>
          </StarBox>
        </TitleBox>
        
        <Info2>
          {movie_detail.description}
        </Info2>
        <br/>
        <Info3>
          <Director>감독: {movie_detail.director}</Director>
          <Actor>출연: {movie_detail.actor1} {movie_detail.actor2} {movie_detail.actor3}</Actor>
        </Info3>
        <MyListBtn onClick={addCollection}>+ 내 리스트에 담기</MyListBtn>
        <ReviewBox>
          <ReStarBox>
            <Star setReviewStar={setReviewStar} />
            <WritingBtn onClick={makeReview}>작성</WritingBtn>
          </ReStarBox>
          <ReWriting>
            <ReviewArea placeholder="댓글을 남겨주세요" onChange={(e) => {setReviewContent(e.target.value)}}>
            </ReviewArea>
          </ReWriting>
        </ReviewBox>

        {movie_comment.map((val, index) => {
          return <Review key={index} date={val.modifiedAt} rate={val.rate} username={val.name} content={val.content} id={val.r_id} />
        })}
        <PaginationContainer>
          {pages.map((val, index) => {
            let name = `pagination_${index + 1}`;
            return (
              <Pagination key={index}>
                <a className={name} onClick={GetPage}>
                  {index + 1}
                </a>
              </Pagination>
            );
          })}
        </PaginationContainer>
      </Wrap>
  )
}

const Wrap = styled.div`
  width: 720px;
  height: 100%;
  margin: 0 auto;
  padding: 46px 0;
  box-sizing: border-box;
  // border: 1px solid #fff;

`;

const MovieImg = styled.div`
  width: 100%;
  height: 410px;
  display: inline-block;
  margin: 0 auto 25px;
  // border: 1px solid #fff;
  
  overflow: hidden;
  object-fit: contain;
  background-image: url(${(props) => props.url});
  background-size: 285px;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 auto;
  padding: 0;
  display: inline-block;
  height: 61px;
`;

const StarBox = styled.div`
  display: flex;
  height: 26px;
  margin: 26px 0 54px;
  justify-content: space-between;
  align-items: flex-end;
  gap: 14px;
`;

const StarOne = styled.div`
  margin: 0;
  padding: 0;
  height: 34px;
  font-size: 1.65rem;
  font-weight: 700;
  color: #ee3a57;
`;

const StarNum = styled.div`
  margin: 0;
  padding: 0;
  height: 38px;
  font-size: 2rem;
  font-weight: 700;
`;

const Info1 = styled.div`
  margin: 12px auto 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 20px;
`;

const Y = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const RunTime = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const Limit = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin: 8px 0 0;
  padding: 0;
`;

const Info2 = styled.p`
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

const Info3 = styled.div`
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

const Director = styled.p`
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

const Actor = styled.p`
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

const MyListBtn = styled.button`
  border: 0;
  border-radius: 4px;
  background-color: #ee3a57;
  color: #fff;
  width: 100%;
  height: 50px;
  margin: 30px 0 56px 0;
  padding: 0 0 1.5px 0;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  &:hover {
    transition: 0.2s;
    background-color: transparent;
    border: 1px solid #ff5974;
  }
`;

const ReviewBox = styled.div`
  margin: 0;
  padding: 14px 0;
  width: 100%;
  min-height: 60px;
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReStarBox = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WritingBtn = styled.button`
  background-color: transparent;
  border: 1px solid #ff5974;
  border-radius: 3px;
  color: #fff;
  width: 70px;
  height: 30px;
  margin: 0;
  padding: 0 0 1.5px 0;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  &:hover {
    transition: 0.2s;
    border: 0;
    background-color: #ee3a57;
  }
`;

const ReWriting = styled.div`
  height: 100%;
  width: 100%;
  margin: 5px 0 0;
`;

const ReviewArea = styled.textarea`
  margin: 0;
  width: 100%;
  height: 70px;
  padding: 10px;
`;

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pagination = styled.span`
  width: 1.75rem;
  height: 1.75rem;
  text-align: center;
  background-color: #ee3a57;
  border: 1px solid #ee3a57;
  border-radius: 5px;
  margin: 0 0.5rem;
  & a {
    width: 100%;
    height: 100%;
    cursor: pointer
  }
`;

export default Detail;
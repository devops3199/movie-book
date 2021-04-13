import React from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Star from "elements/Star";
import Review from "components/Review";

const Detail = (props) => {

    return(
        <Wrap>
          <MovieImg></MovieImg>
          <TitleBox>
            <Title>익스트랙션</Title>
            <StarBox>
              <StarOne><FontAwesomeIcon icon={faStar} /></StarOne>
              <StarNum>5.0</StarNum>
            </StarBox>
          </TitleBox>
          <Info1>
            <Y>2020</Y>
            <RunTime>1시간 57분</RunTime>
            <Limit>15세이상관람가</Limit>
          </Info1>
          <Info2>
            어떤 일에도 쉽게 동요하지 않는 냉철한 용병. 그가 살아남기 위해 자신을 끊임없이 성찰한다. 
            마약왕에게 납치된 아들을 구하러 간 방글라데시에서 그 모든 것이 시작됐다.
          </Info2>
          <Info3>
            <Director>감독: 샘 하그레이브</Director>
            <Actor>출연: 크리스 헴스워스, 루드락시 자이스왈, 란딥 후다</Actor>
            <Genre>장르: 액션</Genre>
          </Info3>
          <MyListBtn>+ 내 리스트에 담기</MyListBtn>
          <ReviewBox>
            <ReStarBox>
              <Star/>
              <WritingBtn>글작성</WritingBtn>
            </ReStarBox>
            <ReWriting>
              <P placeholder="댓글을 남겨주세요">
              </P>
              {/* <ReUser>
                <li>gaflke88</li>
                <li>2021.03.24 14:22</li>
              </ReUser> */}
            </ReWriting>
          </ReviewBox>
          <Review/>
          <Review/>
          
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
  // max-width: 100%;
  height: 410px;
  display: inline-block;
  margin: 0 auto 25px;
  border-radius: 4px;
  
  overflow: hidden;
  object-fit: contain;
  background-image: url("https://i.ytimg.com/vi/L6P3nI6VnlY/maxresdefault.jpg");
  background-size: 720px;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
  display: inline-block;
  height: 61px;
`;

const StarBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
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
  margin: 12px 0 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 20px;
`;

const Y = styled.p`
  font-size: 1.7rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const RunTime = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const Limit = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const Info2 = styled.p`
  font-size: 1rem;
  margin: 12px 0;
  padding: 0;
`;

const Info3 = styled.p`
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

const Genre = styled.p`
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
  align-items: ;
`;

const WritingBtn = styled.button`
  background-color: transparent;
  border: 1px solid #ff5974;
  border-radius: 3px;
  color: #fff;
  width: 100px;
  height: 30px;
  margin: 0;
  padding: 0 0 1.5px 0;
  font-size: 0.9rem;
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
  margin: 5px 0 0;
  max-width: 700px;
`;

const P = styled.textarea`
  margin: 0;
  width: 100%;
  height: 70px;
  padding: 10px;
`;

// const ReUser = styled.ul`
//   font-size:13px;
//   display: flex;
//   margin: 16px 0 5px;
//   gap:5px;
//   list-style-type: none;
//   padding: 0;
//   color: rgba(204, 204, 204, 0.5);
  
//   & li:nth-child(1)::after{
//     content: '|';
//     font-size: 6px;
//     font-weight: 600;
//     margin-left: 5px;
//     position: relative;
//     top:-2px;
//   }
// `;

export default Detail;
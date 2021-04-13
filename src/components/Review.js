import React from 'react';
import styled from 'styled-components';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Star from "elements/Star";

const Review = (props) => {

  return (
    <React.Fragment>
      <ReviewBox>
        <ReStarBox>
          <Star/>
        </ReStarBox>
        <ReWriting>
          <P>시리즈 중 최고였던거 같아요;;; 극장가서 보길 잘한듯 ㄹㅇ 존잼임ㅋㅋ 님들아 꼭 나믿고 포디로 보셔라
            시리즈 중 최고였던거 같아요;;; 극장가서 보길 잘한듯 ㄹㅇ 존잼임ㅋㅋ 님들아 꼭 나믿고 포디로 보셔라
          </P>
          <ReUser>
            <li>gaflke88</li>
            <li>2021.03.24 14:22</li>
          </ReUser>
        </ReWriting>
      </ReviewBox>
    </React.Fragment>
  )
}

const ReviewBox = styled.div`
  margin: 0;
  padding: 14px 0;
  width: 100%;
  min-height: 60px;
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  display: flex;
  gap: 10px;
`;

const ReStarBox = styled.div`
  margin: 0;
  padding: 0;
  width: 190px;
  
`;

const ReWriting = styled.div`
  height: 100%;
  margin: 5px 0 0;
  max-width: 520px;
`;

const P = styled.p`
  margin: 0;
  
`;

const ReUser = styled.ul`
  font-size:13px;
  display: flex;
  margin: 16px 0 5px;
  gap:5px;
  list-style-type: none;
  padding: 0;
  color: rgba(204, 204, 204, 0.5);
  
  & li:nth-child(1)::after{
    content: '|';
    font-size: 6px;
    font-weight: 600;
    margin-left: 5px;
    position: relative;
    top:-2px;
  }

`;

export default Review;
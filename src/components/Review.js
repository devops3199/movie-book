import React from 'react';
import styled from 'styled-components';
import Modal from "components/Modal";

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Star from "elements/Star";

const Review = (props) => {

  const [ modalOpen, setModalOpen ] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }

  const { date, rate, username, content, id, is_me } = props;

  return (
    <React.Fragment>
      <ReviewBox>
        <ReStarBox>
          <Box>
            <Stars>
              {/* <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} /> */}
              <Star rate={rate} id={id} />
            </Stars>
            <Num>{rate}</Num>
          </Box>
        </ReStarBox>
        <ReWriting>
          <P>
            {content}
          </P>
          <ReUser>
            <li>{username}</li>
            <li>{date}</li>
            {props.is_me && 
              <div>
                <UpdateBtn onClick={ openModal }>수정</UpdateBtn>
                <Modal open={ modalOpen } close={ closeModal } header="댓글 수정">

                  <main> { props.children } </main> 이 곳에 내용 넣기
                </Modal>
              </div>}
            {props.is_me && <UpdateBtn>삭제</UpdateBtn>}
          </ReUser>
        </ReWriting>
        
      </ReviewBox>
    </React.Fragment>
  )
}

const UpdateBtn = styled.button`
  border: 1px solid #fff;
  // position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(238, 58, 88, 0);
  border: 0;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.7);
  width: 28px;
  height: 20px;
  margin: 0 0 0 2px;
  padding: 0 0 3px 0;
  font-size: 0.74rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  &:hover {
      transition: 0.2s;
      border: 0;
      background-color: rgba(238, 58, 88, 0.7);
      color: rgba(255, 255, 255, 0.8);
  }
`;

const Box = styled.div`
  margin: 0;
  padding: 0;
  height: 50px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const Stars = styled.div`
  margin: 9px 0 0;
  padding: 0;
  color: #ee3a57;
  font-size: 1rem;
  display: flex;
  gap: 3px;
`;

const Num = styled.div`
  margin: 2.2px 0 0;
  padding: 0;
  height: 30px;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  display: inline-flex;
`;

const ReviewBox = styled.div`
  position: relative;
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
  width: 100%;
`;

const P = styled.p`
  margin: 0;
  
`;

const ReUser = styled.ul`
  font-size: 13px;
  display: flex;
  justify-content: flex-start;
  margin: 16px 0 5px;
  gap:5px;
  list-style-type: none;
  padding: 0;
  color: rgba(204, 204, 204, 0.5);
  width: 100%;
  
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
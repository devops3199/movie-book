import React from 'react';
import styled from 'styled-components';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as myMovieActions } from 'redux/modules/mymovie';

const MyMovieCard = (props) => {
    const { url, title, year, rate, director, actor1, actor2, actor3, description, _onClick } = props;

    const styles = {
        url : url,
    };

    const dispatch = useDispatch();

    const removeCheck = () => {
        // 삭제 요청 재확인하기
        if (window.confirm("내 영화 리스트에서 삭제하시겠습니까?") == true){    
            //확인
            dispatch(myMovieActions.deleteMovieAPI(props.cid))

        }else{   
            //취소
            return false;
        }
    }

    return (
        <CardBox onClick={_onClick}>
            <Image {...styles}>
            </Image>

            <Info>

                <Info1>
                    <Title>{title} ({year})</Title>
                    <StarOne><FontAwesomeIcon icon={faStar} /> {rate}</StarOne>
                </Info1>
                
                <Info2>
                    <span>감독: {director}</span>
                    <span>출연: {actor1} {actor2} {actor3}</span>
                    <Desc>{description}</Desc>
                </Info2>
                
            </Info>
            <DelBtn onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                removeCheck();
            }}>삭제</DelBtn>
        </CardBox>
    );
};

MyMovieCard.defaultProps = {
    url : 'https://movie-phinf.pstatic.net/20210308_97/1615182990261ekXlL_JPEG/movie_image.jpg',
    title : '베일리 어게인',
    year : '2017',
    rate : '9.53',
    director : '정성목',
    actor1 : '1번이야',
    actor2 : '2번이야',
    actor3 : null,
    description : '귀여운 소년 ‘이든’의 단짝 반려견 ‘베일리’는 행복한 생을 마감한다.  하지만 눈을 떠보니 다시 시작된 견생 2회차, 아니 3회차?!  1등 경찰견 ‘엘리’에서 찰떡같이 마음을 알아주는 소울메이트 ‘티노’까지!  다시 태어날 때마다 성별과 생김새, 직업(?)에 이름도 바뀌지만,  여전히 영혼만은 사랑 충만! 애교 충만! 주인바라기 ‘베일리’    어느덧 견생 4회차, 방랑견이 되어 떠돌던 ‘베일리’는  마침내 자신이 돌아온 진짜 이유를 깨닫고 어딘가로 달려가기 시작하는데…',
};

const CardBox = styled.div`
    width: 700px;
    height : 280px;
    display: flex;
    justify-content: flex-start;
    margin: 0 auto 20px;
    border-radius: 10px;
    background: rgba(200, 200, 200, 0.04);
    backdrop-filter: blur(7px);
    box-shadow: 6px 8px 8px rgba(24, 24, 24, 0.6);

    cursor: pointer;

    &:hover {
        transition: 0.2s;
        transform: scale(1.05);

    }
    &:not(hover) {
        transition: 0.2s;

    }
`;

const Image = styled.div`
    background-image: url(${(props) => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-sizing: border-box;
    // border: 1px solid blue;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    width: 180px;
    height: 100%;
    filter: brightness(0.9);
    &:hover {
        transition: 0.2s;
        filter: brightness(1);
    }
`;

const Info = styled.div`
    // border: 1px solid green;
    width: 100%;
    max-width: 516px;
    height: 100%;
    max-height: 264px;
    padding: 10px 20px;
    overflow: hidden;
`;

const Info1 = styled.div`
    // border: 1px solid green;
    // padding: 10px 0 10px 20px;
    color: rgba(255, 255, 255, 0.9);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Title = styled.span`
    font-size: 1.4rem;
    font-weight: 700;
`;

const StarOne = styled.div`
  padding: 0;
  height: 34px;
  font-size: 1rem;
  font-weight: 700;
  color: #ee3a57;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Info2 = styled.div`
    // border: 1px solid green;
    width: 100%;
    height: 186px;
    margin-top: 3px;
    display: flex;
    flex-direction: column;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
`;

const Desc = styled.span`
    margin-top: 10px;
`;

const DelBtn = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(238, 58, 88, 0);
    border: 1px solid rgba(238, 58, 88, 0.6);
    border-radius: 3px;
    color: rgba(255, 255, 255, 0.9);
    width: 46px;
    height: 28px;
    margin: 0;
    padding: 0 0 1.5px 0;
    font-size: 0.74rem;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    &:hover {
        transition: 0.2s;
        border: 0;
        background-color: rgba(238, 58, 88, 0.9);
    }
`;

export default MyMovieCard;
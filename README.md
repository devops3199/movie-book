# :fleur_de_lis: 항해99 미니 프로젝트 (MovieBook)

<p align='center'>
    <img src="https://img.shields.io/badge/React-v17.0.2-blue?logo=React"/>
    <img src="https://img.shields.io/badge/Redux-v4.0.5-purple?logo=Redux"/>
    <img src="https://img.shields.io/badge/Immer-v9.0.1-00E7C3?logo=Immer"/>
    <img src="https://img.shields.io/badge/Lodash-v4.17.21-blue"/>
    <img src="https://img.shields.io/badge/StyledComponents-v5.2.1-pink?logo=styled-components"/>
    <img src="https://img.shields.io/badge/SpringBoot-v2.4.4-6db33f?logo=Spring"/>
    <img src="https://img.shields.io/badge/yarn-^1.22.10-yellow?logo=yarn" />
</p>

### :timer_clock: 개발기간
+ 2021년 04월 09일 ~ 2021년 04월 22일

### :mage: 맴버구성
+ :lipstick: Frontend - React
  + 정찬엽
     + 다수 비동기 작업 처리. async,await 사용
     ``` Javascript
      const addMovieCollectionAPI = (mid = null) => {
        return async function (dispatch, getState, { history }) {
          let access_token = localStorage.getItem("token");
          let refresh_token = localStorage.getItem('refresh_token');
          const api = `http://13.209.47.134/api/collections/authentication/${mid}`;

          if (!access_token) {
            alert('로그인을 먼저 해주세요!');
            return;
          }

          if(!mid) {
            alert('잘못된 접근입니다.');
            return;
          }

          /* 서버 요청 */
          const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token': `${access_token}`,
              }
            })
            .then(res => res.json())
            .catch(err => console.log(err, "addMovieCollection"));

          if(response.status !== undefined) {
            // 401 권한없음
            if(response.status === 401) {
              alert('재로그인이 필요합니다.');
              dispatch(userActions.logout('/login')); // 토큰 삭제 후 로그인 페이지로 이동
              return;
            } else {
              // 500 서버 에러
              alert('유효하지 않은 접근입니다.');
              return;
            }
          }
          
          /* 만약 토큰이 만료되면 다시 요청해서 새로운 토큰 발급 */
          if(response.msg.includes('만료')) {
              const reToken = await fetch(api, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Access-Token':`${access_token}`,
                      'Refresh-Token':`${refresh_token}`,
                    }
                  })
                  .then((res) => {
                    if(res.status === 200) {
                      access_token = res.headers.get("Access-Token");
                      refresh_token = res.headers.get("Refresh-Token");
              
                      // 새 토큰으로 local storage에 저장
                      localStorage.setItem('token', access_token);
                      localStorage.setItem('refresh_token', refresh_token);
                    } 
                  })
                  .catch(err => console.log(err, "addMovieCollection"));

              /* 새로받은 토큰으로 다시 서버 요청 */
              const new_request = await fetch(api, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Access-Token':`${access_token}`,
                    }
                  })
                  .then(res => res.json())
                  .catch(err => console.log(err, "addMovieCollection"));

              if(new_request.status !== undefined) {
                // 401 권한없음
                if(new_request.status === 401) {
                  alert('재로그인이 필요합니다.');
                  dispatch(userActions.logout('/login')); // 토큰 삭제 후 로그인 페이지로 이동
                  return;
                } else {
                  // 500 서버 에러
                  alert('유효하지 않은 접근입니다.');
                  return;
                }
              }
              alert(new_request.msg); // 영화 리스트 등록 성공
          } else {
              alert(response.msg); // 영화 리스트 등록 성공
          }
        }
      };
     ```
     + 영화 댓글 작성 및 페이징 기능 개발
     + Carousel 개발
     + 무한 스크롤 (검색 결과 페이지) 개발
       + Throttle 응용
     + Frontend DevOps 관리 (Git, AWS S3, Router 53)
  + 정성목
     + 로그인(JWT)/회원가입 기능 개발
     + 내 영화(영화 컬랙션) 기능 개발
     + 영화 댓글 수정, 삭제 및 별점 기능 개발
     + 영상 제작
+ :computer: Backend - Spring
  + 채진욱 (팀장)
  + 엄민식
  + Source (해당 주소에서 확인 가능합니다.)
    + https://github.com/cowlsdnr77/moviebook

### :100: 배운점 + 느낀점
+ React Hook (Context API), HTTP (흐름이해 + OSI 계층),
  + https://kodepaper.tistory.com/21
  + https://kodepaper.tistory.com/22
+ 비동기 Async/Await
  + https://kodepaper.tistory.com/25

### :clapper: 결과물
https://youtu.be/c6mZIPFTwj4

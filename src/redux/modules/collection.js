import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionCreators as userActions } from 'redux/modules/user';

const SET_COLLECTION = "SET_COLLECTION"; // 내 영화 리스트 설정
const ADD_COLLECTION = "ADD_COLLECTION"; // 내 영화 리스트 추가
const DELETE_COLLECTION = "DELETE_COLLECTION"; // 내 영화 리스트 삭제

const setCollection = createAction(SET_COLLECTION, (list) => ({ list }));
const deleteCollection = createAction(DELETE_COLLECTION, (id) => ({ id }));

const initialState = {
  list:[],
}

const getMovieCollectionAPI = (uid) => {
  return async function (dispatch, getState, { history }) {
    if (!uid) {
      alert('로그인을 먼저 해주세요!');
      return;
    }

    const api = `http://13.209.47.134/api/collections/list/${uid}`;
    
    fetch(api)
      .then((res) => res.json())
      .then((res) => {
        
        let movie_list = [];
        res.forEach((m) => {
          let movie = {
            mid: m.movie.m_id,
            cid: m.c_id,
            url: m.movie.image_url,
            title: m.movie.title,
            year: m.movie.opening_date,
            rate: m.movie.rate,
            director: m.movie.director,
            actor1: m.movie.actor1,
            actor2: m.movie.actor2,
            actor3: m.movie.actor3,
            description: m.movie.description,
          }

          movie_list.push(movie);
        });
        dispatch(setCollection(movie_list));
      });
  }
};

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
    
    /* 만약 토큰이 만료되면 다시 요청해서 새로운 토근 발급 */
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

const deleteMovieCollectionAPI = (cid = null) => {
  return async function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("token");
    let refresh_token = localStorage.getItem('refresh_token');
    const api = `http://13.209.47.134/api/collections/authentication/${cid}`;

    if (!access_token) {
      alert('로그인을 먼저 해주세요!');
      return;
    }

    if(!cid) {
      alert('잘못된 접근입니다.');
      return;
    }

    /* 서버 요청 */
    const response = await fetch(api, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Token': `${access_token}`,
        }
      })
      .then(res => res.json())
      .catch(err => console.log(err, "deleteMovieCollection"));
    
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

    /* 만약 토큰이 만료되면 다시 요청해서 새로운 토근 발급 */
    if(response.msg.includes('만료')) {
        const reToken = await fetch(api, {
            method: 'DELETE',
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
            .catch(err => console.log(err, "deleteMovieCollection"));

        /* 새로받은 토큰으로 다시 서버 요청 */
        const new_request = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token':`${access_token}`,
              }
            })
            .then(res => res.json())
            .catch(err => console.log(err, "deleteMovieCollection"));

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
        alert(new_request.msg); // 영화 리스트 삭제 성공
    } else {
        alert(response.msg); // 영화 리스트 삭제 성공
    }

    dispatch(deleteCollection(cid));
  }
};

export default handleActions(
  {
    [SET_COLLECTION]: (state, action) => produce(state, (draft)=>{
      draft.list = action.payload.list;
    }),

    [ADD_COLLECTION]: (state, action) => produce(state, (draft) => {
      draft.list.push(action.payload.movie);
    }),

    [DELETE_COLLECTION]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((c)=>c.cid === action.payload.id)
      draft.list.splice(idx, 1);
    }),
  },initialState
);

const actionCreators = {
  getMovieCollectionAPI,
  addMovieCollectionAPI,
  deleteMovieCollectionAPI,
};

export { actionCreators };
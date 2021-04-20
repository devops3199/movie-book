import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const SET_COLLECTION = "SET_COLLECTION"; // 내 영화 리스트 설정
const ADD_COLLECTION = "ADD_COLLECTION"; // 내 영화 리스트 추가
const DELETE_COLLECTION = "DELETE_COLLECTION"; // 내 영화 리스트 삭제

const setCollection = createAction(SET_COLLECTION, (list) => ({ list }));
const deleteCollection = createAction(DELETE_COLLECTION, (id) => ({ id }));

const initialState = {
  list:[],
}

const getMovieCollectionAPI = (uid) => {
  return function (dispatch, getState, { history }) {
    if (!uid) {
        console.log('실패');
      return false;
    }
    const API = `http://13.209.47.134/api/collections/list/${uid}`;
    fetch(API)
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
}

const addMovieCollectionAPI = (mid =null) => {
  return function (dispatch, getState, { history }) {
    
    const token = localStorage.getItem('token');
    if (!mid || !token) {
      console.log('실패에요');
      alert('로그인이 필요합니다!');
      return false;
    }
    const API = `http://13.209.47.134/api/collections/authentication/${mid}`;
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`${token}`,
      }
    })
    .then((res) => res.text())
    .then((result) => {
      alert(result);
    });
  }
}

const deleteMovieCollectionAPI = (cid =null) => {
  return function (dispatch, getState, { history }) {
    
    const token = localStorage.getItem('token');

    if (!cid || !token) {
      console.log('실패에요');
      return;
    }

    const API = `http://13.209.47.134/api/collections/authentication/${cid}`;
    fetch(API, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    })
    .then((res) => res.text())
    .then((result) => {
      alert(result);
      dispatch(deleteCollection(cid));
    });
    
  }
}

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
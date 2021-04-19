import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const SET_MOVIE = "SET_MOVIE";
const ADD_MOVIE = "ADD_MOVIE";
const DELETE_MOVIE = "DELETE_MOVIE";
const UPDATE_MOVIE = "UPDATE_MOVIE";

const setMovie = createAction(SET_MOVIE, (movieList) => ({ movieList }));
const addMovie = createAction(ADD_MOVIE, (movie) => ({ movie }));
const deleteMovie = createAction(DELETE_MOVIE, (movieId) => ({ movieId }));
const updateMovie = createAction(UPDATE_MOVIE, (movie_id, movie) => ({ movie_id, movie}));

const initialState = {
  list:[],
}

const getMovieAPI = (uid) => {
  return function (dispatch, getState, { history }) {
    if (!uid) {
        console.log('실패');
      return false;
    }
    const token = localStorage.getItem('token');
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
        dispatch(setMovie(movie_list));
      });
  }
}

const addMovieAPI = (mid =null) => {
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
      console.log(result);
      alert(result);
    });
  }
}

const deleteMovieAPI = (cid =null) => {
  return function (dispatch, getState, { history }) {
    
    const token = localStorage.getItem('token');

    if (!cid || !token) {
      console.log('실패에요');
      return false;
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

      dispatch(deleteMovie(cid))
    });
    
  }
}

export default handleActions(
  {
    [SET_MOVIE]: (state, action) => produce(state, (draft)=>{
      draft.list = action.payload.movieList;
    }),
    [ADD_MOVIE]: (state, action) => produce(state, (draft) => {
      draft.list.push(action.payload.movie);
    }),
    [DELETE_MOVIE]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((c)=>c.cid === action.payload.movieId)
      draft.list.splice(idx, 1);
    }),
  },initialState
);

const actionCreators = {
  getMovieAPI,
  addMovieAPI,
  deleteMovieAPI,
};

export { actionCreators };
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_MOVIE_TODAY = "SET_MOVIE_TODAY";
const SET_MOVIE_SEARCH = "SET_MOVIE_SEARCH";
const SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL";
const SET_SEARCH_PAGE = "SET_SEARCH_PAGE";
const SET_KEYWORD = "SET_KEYWORD";
const SET_COMMENT = "SET_COMMENT";
const CLEAR_SEARCH_PAGE = "CLEAR_SEARCH_PAGE";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "EDIT_COMMENT";

const setMovieToday = createAction(SET_MOVIE_TODAY, (movie) => ({movie}));
const setMovieSearch = createAction(SET_MOVIE_SEARCH, (movie) => ({movie}));
const setMovieDetail = createAction(SET_MOVIE_DETAIL, (movie, comment) => ({movie, comment}));
const setSearchPage = createAction(SET_SEARCH_PAGE, (page) => ({page}));
const setKeyword = createAction(SET_KEYWORD, (keyword) => ({keyword}));
const setComment = createAction(SET_COMMENT, (comment) => ({comment}));
const clearSearchPage = createAction(CLEAR_SEARCH_PAGE, () => ({}));
const editComment = createAction(EDIT_COMMENT, (r_id, comment) => ({r_id, comment}));
const deleteComment = createAction(DELETE_COMMENT, (r_id) => ({r_id}));

const initialState = {
    list : [],
    search : {
        content: [],
        last: false,
    },
    comment : {
        list: [],
        total_page : 1,
    },
    detail : {},
    search_page : 0,
    keyword : '',
};

const getMoiveToday = () => {
    return function(dispatch, getState, {history}){
        const api = 'http://13.209.47.134/api/movies/random';

        fetch(api)
            .then(res => res.json())
            .then(data => dispatch(setMovieToday(data)))
            .catch(err => console.log(err, "getMovieToday"));
        
    }
};

const getMoiveScroll = () => {
    return function(dispatch, getState, {history}){
        const page = getState().movie.search_page;
        const keyword = getState().movie.keyword;
        const api = `http://13.209.47.134/api/movies?search=${keyword}&page=${page}`;

        fetch(api)
            .then(res => res.json())
            .then(data => {
                
                if(!data.last) {
                    dispatch(setSearchPage(page + 1));
                } else {
                    dispatch(setSearchPage(0));
                }

                dispatch(setMovieSearch(data));
            })
            .catch(err => console.log(err, "getMoiveScroll")); 
    }
};

const getMoiveSearch = (keyword) => {
    return function(dispatch, getState, {history}){
        dispatch(clearSearchPage()); // 전에 검색했던거 다 지우기
        dispatch(setKeyword(keyword));

        const page = getState().movie.search_page;
        const api = `http://13.209.47.134/api/movies?search=${keyword}&page=${page}`;

        fetch(api)
            .then(res => res.json())
            .then(data => {
                
                if(!data.last) {
                    dispatch(setSearchPage(page + 1));
                } else {
                    dispatch(setSearchPage(0));
                }

                dispatch(setMovieSearch(data));
            })
            .catch(err => console.log(err, "getMoiveSearch")); 
    }
};

const getMovieDetail = (id) => {
    return async function(dispatch, getState, {history}){
        // Promise.then 
        const moiveApi = `http://13.209.47.134/api/movies/details/${id}`;
        const commentApi = `http://13.209.47.134/api/movies/reviews/list/${id}?page=1`;

        const movie = await fetch(moiveApi).then(res => res.json());
        const comment = await fetch(commentApi).then(res => res.json());
        dispatch(setMovieDetail(movie, comment));
    }
};

const getMovieComment = (id, page) => {
    return async function(dispatch, getState, {history}){
        const commentApi = `http://13.209.47.134/api/movies/reviews/list/${id}?page=${page}`;
        const comment = await fetch(commentApi).then(res => res.json());
        dispatch(setComment(comment));
    }
}

const addComment = (comment) => {
    return function(dispatch, getState, {history}){
        const token = localStorage.getItem("token");
        const api = `http://13.209.47.134/api/movies/reviews/authentication/${comment.m_id}`;

        if(!token){
            alert('로그인을 먼저 해주세요!');
        } else {
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                rate : comment.rate,
                content : comment.content,
            })
        })
            .then(res => res.text())
            .then(data => {
                alert(data);
                dispatch(getMovieDetail(comment.m_id));
                // window.location.reload();
            })
            .catch(err => console.log(err, "addComment"));
        }
    }
}

const editCommentAPI = (comment) => {
    return function (dispatch, getState, { history }) {
        const token = localStorage.getItem('token');
        
        if (!token || !comment) {
            return false;
        }

        const API = `http://13.209.47.134/api/movies/reviews/authentication/${comment.r_id}`;
        fetch(API, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                rate : comment.rate,
                content : comment.content,
            })
        })
        .then((res) => res.text())
        .then((result) => {
            alert(result);
            window.location.reload();
        });
    }
}

const deleteCommentAPI = (r_id, m_id) => {
  return function (dispatch, getState, { history }) {
    
    const token = localStorage.getItem('token');

    if (!r_id || !token) {
      return false;
    }

    const API = `http://13.209.47.134/api/movies/reviews/authentication/${r_id}`;
    fetch(API, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
      }
    })
    .then((res) => res.text())
    .then((result) => {
        alert(result);
        dispatch(deleteComment(r_id))
        window.location.reload();
    });
  }
}

export default handleActions({
    [SET_MOVIE_TODAY] : (state, action) => produce(state, (draft) => {
        let temp = action.payload.movie.slice(0, 7);
        //draft.list.push(...temp);
        draft.list = temp;
    }),

    [SET_MOVIE_SEARCH] : (state, action) => produce(state, (draft) => {
        if(action.payload.movie.first){
            draft.search.content = action.payload.movie.content;
        } else {
            draft.search.content.push(...action.payload.movie.content);
        }
        draft.search.last = action.payload.movie.last;
    }),

    [SET_MOVIE_DETAIL] : (state, action) => produce(state, (draft) => {
        draft.detail = action.payload.movie;
        draft.comment.list = action.payload.comment.content;
        draft.comment.total_page = action.payload.comment.totalPages;
    }),

    [SET_SEARCH_PAGE] : (state, action) => produce(state, (draft) => {
        draft.search_page = action.payload.page;
    }),

    [CLEAR_SEARCH_PAGE] : (state, action) => produce(state, (draft) => {
        draft.search = { content : [], last: false, };
        draft.search_page = 0;
    }),

    [SET_KEYWORD] : (state, action) => produce(state, (draft) => {
        draft.keyword = action.payload.keyword;
    }),

    [SET_COMMENT] : (state, action) => produce(state, (draft) => {
        draft.comment.list = action.payload.comment.content;
    }),

    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((c)=>c.r_id === action.payload.r_id)
      draft.list.splice(idx, 1);
    }),

}, initialState);

const actionCreators = {
    getMoiveToday,
    getMoiveSearch,
    getMovieDetail,
    getMoiveScroll,
    setSearchPage,
    clearSearchPage,
    setKeyword,
    getMovieComment,
    addComment,
    editComment,
    deleteComment,
    editCommentAPI,
    deleteCommentAPI,
};
  
export { actionCreators };
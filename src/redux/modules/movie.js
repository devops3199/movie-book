import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_MOVIE_TODAY = "SET_MOVIE_TODAY"; // 메인 페이지 - 오늘의 영화 리스트
const SET_MOVIE_COLLECTION = "SET_MOVIE_COLLECTION"; // 메인 페이지 - 사용자 영화 리스트

const SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL"; // 영화 디테일

const SET_MOVIE_SEARCH = "SET_MOVIE_SEARCH"; // 검색 페이지
const SET_SEARCH_PAGE = "SET_SEARCH_PAGE"; // 검색 페이지 - 무한 스크롤
const CLEAR_SEARCH_PAGE = "CLEAR_SEARCH_PAGE"; // 새롭게 검색할때 초기화
const SET_KEYWORD = "SET_KEYWORD"; // 검색어 전역으로 설정

const SET_LOADING = "SET_LOADING"; // 내용 로딩

const SET_COMMENT = "SET_COMMENT"; // 영화 댓글 추가
const EDIT_COMMENT = "EDIT_COMMENT"; // 댓글 수정
const DELETE_COMMENT = "DELETE_COMMENT"; // 댓글 삭제

const setMovieToday = createAction(SET_MOVIE_TODAY, (movie) => ({movie})); // 메인 페이지 - 오늘의 영화 리스트
const setMovieCollection = createAction(SET_MOVIE_COLLECTION, (collection) => ({collection})); // 메인 페이지 - 사용자 영화 리스트

const setMovieDetail = createAction(SET_MOVIE_DETAIL, (movie, comment) => ({movie, comment})); // 영화 디테일

const setMovieSearch = createAction(SET_MOVIE_SEARCH, (movie) => ({movie})); // 검색 페이지
const setSearchPage = createAction(SET_SEARCH_PAGE, (page) => ({page})); // 검색 페이지 - 무한 스크롤
const clearSearchPage = createAction(CLEAR_SEARCH_PAGE, () => ({})); // 새롭게 검색할때 초기화
const setKeyword = createAction(SET_KEYWORD, (keyword) => ({keyword})); // 검색어 전역으로 설정

const setLoading = createAction(SET_LOADING, (loading, page) => ({loading, page})); // 내용 로딩

const setComment = createAction(SET_COMMENT, (comment) => ({comment})); // 영화 댓글 추가
const editComment = createAction(EDIT_COMMENT, (r_id, rate, comment) => ({r_id, rate, comment})); // 댓글 수정
const deleteComment = createAction(DELETE_COMMENT, (r_id) => ({r_id})); // 댓글 삭제

const initialState = {
    list : [],
    movie_collection: [],
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
    loading : {
        main_page : true, 
        detail_page : true,
    },
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

const getMovieCollection = () => {
    return async function(dispatch, getState, {history}){
        const users = [31, 28, 1, 32]; // user id
        let user_collection = {};

        // forEach does not support async await
        for(let i = 0; i < users.length; i++) {
            const api = `http://13.209.47.134/api/collections/list/${users[i]}`;
            const result = await fetch(api).then(res => res.json());
            let user_name = result[0].user.name; // 임시
            let temp = { [user_name] : result };
            user_collection = {...user_collection, ...temp};
        }

        dispatch(setMovieCollection(user_collection));
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

        dispatch(setLoading(true, 'detail_page'));

        // Promise.then 
        const moiveApi = `http://13.209.47.134/api/movies/details/${id}`;
        const commentApi = `http://13.209.47.134/api/movies/reviews/list/${id}?page=1`;

        const movie = await fetch(moiveApi).then(res => res.json());
        const comment = await fetch(commentApi).then(res => res.json());
        dispatch(setMovieDetail(movie, comment));

        dispatch(setLoading(false, 'detail_page'));
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
            dispatch(editComment(comment.r_id, comment.rate, comment.content));
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
    });
  }
}

export default handleActions({
    [SET_MOVIE_TODAY] : (state, action) => produce(state, (draft) => {
        let temp = action.payload.movie.slice(0, 7);
        //draft.list.push(...temp);
        draft.list = temp;
    }),

    [SET_MOVIE_COLLECTION] : (state, action) => produce(state, (draft) => {
        draft.movie_collection = action.payload.collection;
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

    [SET_LOADING] : (state, action) => produce(state, (draft) => {
        
        if(action.payload.page === 'detail_page') {
            draft.loading.detail_page = action.payload.loading;
        } else {
            draft.loading.main_page = action.payload.loading;
        }
    }),

    [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
      let idx = draft.comment.list.findIndex((c)=>c.r_id === action.payload.r_id);
      draft.comment.list[idx].rate = action.payload.rate;
      draft.comment.list[idx].content = action.payload.comment;
      
    }),
    
    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
      let idx = draft.comment.list.findIndex((c)=>c.r_id === action.payload.r_id);
      draft.comment.list.splice(idx, 1);
    }),

}, initialState);

const actionCreators = {
    getMoiveToday,
    getMovieCollection,
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
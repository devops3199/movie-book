import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { actionCreators as userActions } from 'redux/modules/user';

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
        let users = [31, 28, 1, 32, 29, 14]; // user id
        users = users.sort(() => Math.random() - 0.5); // Shuffle
        let user_collection = {};

        // forEach does not support async await
        for(let i = 0; i < users.length; i++) {
            const api = `http://13.209.47.134/api/collections/list/${users[i]}`;
            const result = await fetch(api).then(res => res.json());
            if(result.length > 0){
                let user_name = result[0].user.name;
                let temp = { [user_name] : result };
                user_collection = {...user_collection, ...temp};
            }
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
        const commentApi = `http://13.209.47.134/api/reviews/list/${id}?page=1`;

        const movie = await fetch(moiveApi).then(res => res.json());
        const comment = await fetch(commentApi).then(res => res.json());
        dispatch(setMovieDetail(movie, comment));

        dispatch(setLoading(false, 'detail_page'));
    }
};

const getMovieComment = (id, page) => {
    return async function(dispatch, getState, {history}){
        const commentApi = `http://13.209.47.134/api/reviews/list/${id}?page=${page}`;
        const comment = await fetch(commentApi).then(res => res.json());
        dispatch(setComment(comment));
    }
}

const addComment = (comment) => {
    return async function(dispatch, getState, {history}){
        let access_token = localStorage.getItem("token");
        let refresh_token = localStorage.getItem('refresh_token');
        const api = `http://13.209.47.134/api/reviews/authentication/${comment.m_id}`;

        if(!access_token){
            alert('로그인을 먼저 해주세요!');
        } else {

        /* 서버 요청 */
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token': `${access_token}`,
            },
            body: JSON.stringify({
                rate : comment.rate,
                content : comment.content,
                })
            })
            .then(res => res.json())
            .catch(err => console.log(err, "addComment"));

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
                },
                body: JSON.stringify({
                    rate : comment.rate,
                    content : comment.content,
                    })
                })
                .then((res) => {
                    access_token = res.headers.get("Access-Token");
                    refresh_token = res.headers.get("Refresh-Token");
            
                    // 새 토큰으로 local storage에 저장
                    localStorage.setItem('token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                })
                .catch(err => console.log(err, "addComment"));

            /* 새로받은 토큰으로 다시 서버 요청 */
            const new_request = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Token':`${access_token}`,
                },
                body: JSON.stringify({
                    rate : comment.rate,
                    content : comment.content,
                    })
                })
                .then(res => res.json())
                .catch(err => console.log(err, "addComment"));

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
            alert(new_request.msg); // 리뷰 등록 성공
        } else {
            alert(response.msg); // 리뷰 등록 성공
        }

        dispatch(getMovieDetail(comment.m_id));
        }
    }
}

const editCommentAPI = (comment) => {
    return async function (dispatch, getState, { history }) {
        const api = `http://13.209.47.134/api/reviews/authentication/${comment.r_id}`;
        let access_token = localStorage.getItem("token");
        let refresh_token = localStorage.getItem('refresh_token');

        if (!access_token) {
            alert('로그인을 먼저 해주세요!');
            return;
        }
    
        if(!comment) {
            alert('잘못된 접근입니다.');
            return;
        }

        /* 서버 요청 */
        const response = await fetch(api, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Token': `${access_token}`,
            },
            body: JSON.stringify({
                rate : comment.rate,
                content : comment.content,
                })
            })
            .then(res => res.json())
            .catch(err => console.log(err, "editComment"));

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
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Token':`${access_token}`,
                    'Refresh-Token':`${refresh_token}`,
                },
                body: JSON.stringify({
                    rate : comment.rate,
                    content : comment.content,
                    })
                })
                .then((res) => {
                    access_token = res.headers.get("Access-Token");
                    refresh_token = res.headers.get("Refresh-Token");
            
                    // 새 토큰으로 local storage에 저장
                    localStorage.setItem('token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                })
                .catch(err => console.log(err, "editComment"));


            /* 새로받은 토큰으로 다시 서버 요청 */
            const new_request = await fetch(api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Token':`${access_token}`,
                },
                body: JSON.stringify({
                    rate : comment.rate,
                    content : comment.content,
                    })
                })
                .then(res => res.json())
                .catch(err => console.log(err, "editComment"));

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
            alert(new_request.msg); // 리뷰 수정 성공
        } else {
            alert(response.msg); // 리뷰 수정 성공
        }

        dispatch(editComment(comment.r_id, comment.rate, comment.content));
    }
}

const deleteCommentAPI = (r_id, m_id) => {
  return async function (dispatch, getState, { history }) {
    const api = `http://13.209.47.134/api/reviews/authentication/${r_id}`;
    let access_token = localStorage.getItem("token");
    let refresh_token = localStorage.getItem('refresh_token');

    if (!access_token) {
        alert('로그인을 먼저 해주세요!');
        return;
    }

    if(!r_id) {
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
        .catch(err => console.log(err, "deleteComment"));
    
    if(response.status !== undefined) {
        // 401 권한없음
        if(response.status === 401) {
            alert('재로그인이 필요합니다.');
            dispatch(userActions.logout('/login')); // 토큰 삭제 후 로그인 페이지로 이동
            return;
        } else {
            // 500 서버 에러
            console.log(response);
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
                access_token = res.headers.get("Access-Token");
                refresh_token = res.headers.get("Refresh-Token");
        
                // 새 토큰으로 local storage에 저장
                localStorage.setItem('token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
            })
            .catch(err => console.log(err, "deleteComment"));

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
            .catch(err => console.log(err, "deleteComment"));

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
        alert(new_request.msg); // 리뷰 삭제 성공
    } else {
        alert(response.msg); // 리뷰 삭제 성공
    }

    dispatch(deleteComment(r_id));
  }
}

export default handleActions({
    [SET_MOVIE_TODAY] : (state, action) => produce(state, (draft) => {
        draft.list = action.payload.movie;
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

        let num = action.payload.movie.running_time.replace('분', '');

        if(num > 60) {
            let time = num % 60 === 0 ? `${Math.floor(num / 60)}시간` : `${Math.floor(num / 60)}시간 ${num % 60}분`;
            action.payload.movie.running_time = time;
        }

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
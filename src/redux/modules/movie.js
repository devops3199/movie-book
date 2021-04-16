import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_MOVIE_TODAY = "SET_MOVIE_TODAY";
const SET_MOVIE_SEARCH = "SET_MOVIE_SEARCH";
const SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL";

const setMovieToday = createAction(SET_MOVIE_TODAY, (movie) => ({movie}));
const setMovieSearch = createAction(SET_MOVIE_SEARCH, (movie) => ({movie}));
const setMovieDetail = createAction(SET_MOVIE_DETAIL, (movie, comment) => ({movie, comment}));

const initialState = {
    list : [],
    search : [],
    comment : [],
    detail : {},
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

const getMoiveSearch = (keyword, page) => {
    return function(dispatch, getState, {history}){
        const api = `http://13.209.47.134/api/movies?search=${keyword}&page=${page}`;

        fetch(api)
            .then(res => res.json())
            .then(data => dispatch(setMovieSearch(data)))
            .catch(err => console.log(err, "getMoiveSearch"));
        
    }
};

const getMovieDetail = (id) => {
    return async function(dispatch, getState, {history}){
        // Promise.then 
        const moiveApi = `http://13.209.47.134/api/movies/details/${id}`;
        const commentApi = `http://13.209.47.134/api/movies/reviews/${id}`;

        const movie = await fetch(moiveApi).then(res => res.json());
        const comment = await fetch(commentApi).then(res => res.json());

        dispatch(setMovieDetail(movie, comment));
    }
};

export default handleActions({
    [SET_MOVIE_TODAY] : (state, action) => produce(state, (draft) => {
        let temp = action.payload.movie.slice(0, 7);
        //draft.list.push(...temp);
        draft.list = temp;
    }),

    [SET_MOVIE_SEARCH] : (state, action) => produce(state, (draft) => {
        draft.search = action.payload.movie;
    }),

    [SET_MOVIE_DETAIL] : (state, action) => produce(state, (draft) => {
        draft.detail = action.payload.movie;
        draft.comment = action.payload.comment;
    }),
}, initialState);

const actionCreators = {
    getMoiveToday,
    getMoiveSearch,
    getMovieDetail,
};
  
export { actionCreators };
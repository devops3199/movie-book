import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_MOVIE_TODAY = "SET_MOVIE_TODAY";
const SET_MOVIE_SEARCH = "SET_MOVIE_SEARCH";

const setMovieToday = createAction(SET_MOVIE_TODAY, (movie) => ({movie}));
const setMovieSearch = createAction(SET_MOVIE_SEARCH, (movie) => ({movie}));

const initialState = {
    list: [],
    search: [],
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

const getMoiveSearch = (keyword) => {
    return function(dispatch, getState, {history}){
        const api = `http://13.209.47.134/api/movies?search=${keyword}`;

        fetch(api)
            .then(res => res.json())
            .then(data => dispatch(setMovieSearch(data)))
            .catch(err => console.log(err, "getMoiveSearch"));
        
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
}, initialState);

const actionCreators = {
    getMoiveToday,
    getMoiveSearch,
};
  
export { actionCreators };
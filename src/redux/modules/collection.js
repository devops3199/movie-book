import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_COLLECTION = "SET_MOVIE_COLLECTION";

const setCollection = createAction(SET_COLLECTION, (collection) => ({collection}));

const initialState = {
    list : {},
};

const getCollection = () => {
    return async function(dispatch, getState, {history}){
        const users = [1, 1, 1, 1]; // user id
        let user_collection = {};

        // forEach does not support async await
        for(let i = 0; i < users.length; i++) {
            const api = `http://13.209.47.134/api/collections/list/${users[i]}`;
            const result = await fetch(api).then(res => res.json());
            let user_name = result[0].user.name + i; // 임시
            let temp = { [user_name] : result };
            user_collection = {...user_collection, ...temp};
        }

        dispatch(setCollection(user_collection));
    }
};

export default handleActions({
    [SET_COLLECTION] : (state, action) => produce(state, (draft) => {
        draft.list = action.payload.collection;
    }),
}, initialState);

const actionCreators = {
    getCollection,
};
  
export { actionCreators };
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const loginAPI = (id, pw) => {
    return function (dispatch, getState, { history }) {
        const API = '';
        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: id,
                password: pw,
            })
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res);  // 성공 시 토큰, 유저 정보 저장
            if (res.ok) {
                let token
            }
        })
    }
};
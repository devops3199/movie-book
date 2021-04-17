import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import {getLocal, setLocal, deleteLocal} from "shared/Local";

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  uid: null,
  user: null,
  is_login: false,
};

const signupAPI = (email, pw, pwCheck, userName) => {
  return function (dispatch, getState, { history }) {
    
  const API = 'http://13.209.47.134/api/signup';
  fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: pw,
        password_confirm: pwCheck,
        name: userName,
    })
  })
    .then((res) => res.text())
    .then((res) => {
      alert(res);
    });

    history.push('/login');
  }
};

const loginAPI = (email, pw) => {
  return function (dispatch, getState, { history }) {
    const API = 'http://13.209.47.134/api/login';
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: pw,
      })
    })
    .then((result) => {
    
      console.log(result);
      // let userInfo = result.json();
      
      //성공시 토큰, 유저 정보 저장
      if (result.status === 200) {
        let token = result.headers.get("Authorization");

        localStorage.setItem('token', token);
        console.log(localStorage.getItem("token"));
        
      } else {
        window.alert('로그인에 실패했습니다.');
      }
      return result.json();
    })
    .then(result => {
      console.log(result);
      localStorage.setItem('userInfo', JSON.stringify(result));
      dispatch(setUser({
        uid: result.u_id,
        name: result.name,
      }))
    })
    .catch((error) => {
    console.log(error);
    });
    history.push('/');
  }
};

const logout = () => {
  return function (dispatch, getState, { history }) {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    dispatch(logOut());
    history.replace('/');
  }
};

const isLogin = () => {
  return function (dispatch, getState, { history }) {
    const token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!token || !userInfo) {
      return false;
    }
    dispatch(setUser({
      uid: userInfo.uid,
      name: userInfo.name,
      address: userInfo.address,
    }));
  }
}

export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.uid = action.payload.uid;
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      draft.uid = null;
      draft.user = null;
      draft.is_login = false;
    }),

  }, initialState);
  
const actionCreators = {
  signupAPI,
  loginAPI,
  logout,
  isLogin
};

export { actionCreators };
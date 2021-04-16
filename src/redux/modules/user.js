import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import {getLocal, setLocal, deleteLocal} from "shared/Local";

const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
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
      },
      body: JSON.stringify({
        username: email,
        password: pw,
        password_confirm: pwCheck,
        name: userName,
    })
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
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
      },
      body: JSON.stringify({
        username: email,
        password: pw,
      })
    })
    .then(res => res.json())
    .then((res) => {
    
        console.log(res);
        //성공시 토큰, 유저 정보 저장
    // if (result.status === 200) {
    //   let token = result.headers.get("Authorization");
    //   let userInfo = result.headers.get('userInfo');
    //   userInfo = JSON.parse(userInfo);
    //   userInfo.name = decodeURI(atob(userInfo.name));
    //   userInfo.address = decodeURI(atob(userInfo.address));
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('userInfo', JSON.stringify(userInfo));
    //   dispatch(setUser({
    //     uid: userInfo.uid,
    //     name: userInfo.name,
    //     address: userInfo.address.split('+').join(' '),
    //   }))
    //   history.push('/');
    // } else {
    //   window.alert('로그인에 실패했습니다.');
    // }
    }).catch((error) => {
    console.log(error);
    });
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
      // setLocal("is_login", "success");
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      deleteLocal("is_login");
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
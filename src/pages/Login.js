import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { history } from 'redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';

import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Login = (props) => {

  const [id, setId] = React.useState('');
  const [pw, setPw] = React.useState('');
  const dispatch = useDispatch();

  // const login = (id,pw) => {
    
  //   if (id === '' || pw === '') {
  //     alert('아이디 혹은 비밀번호 오류입니다.');
  //     return false;
  //   }
    
  //   dispatch(userActions.loginAPI(id,pw));

  // }

  return (
    <Wrap>
      <Title>로그인</Title>

      <LoginBox>
        <IconSpan>
          <FontAwesomeIcon icon={faUser} />
        </IconSpan>
        <LoginInput type="text" placeholder="Username" ></LoginInput>
      </LoginBox>

      <LoginBox>
        <IconSpan>
          <FontAwesomeIcon icon={faLock} />
        </IconSpan>
        <LoginInput type="password" placeholder="Password" ></LoginInput>
      </LoginBox>
      
      <LoginButton>로그인</LoginButton>

      <SignupBox>
        <SignupLink onClick={() => history.push('/register')} >회원가입</SignupLink>
      </SignupBox>
      
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 280px;
  height: 100%;
  margin: 0 auto;
  padding: 170px 0;
  box-sizing: border-box;
//   border: 1px solid #ccc;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 21px;
  width: 100%;
  text-align: center;
  margin: 0 0 40px;
`;

const LoginBox = styled.div`
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  width: 100%;
  height: 46px;
  margin: 0 0 15px;
  padding: 8px 0;
  box-sizing: border-box;
  overflow: hidden;
//   &:hover {
//     transition: 0.3s;
//     border-bottom: 1px solid #ff5974;
//   }
  &:focus-within {
    transition: 0.3s;
    border-bottom: 1px solid #ff5974;
  }
`;

const IconSpan = styled.span`
  width: 26px;
  float: left;
  text-align: center;
  padding: 0 8px 0 0;
  color: rgba(204, 204, 204);
`;

const LoginInput = styled.input`
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: -.05em;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: #fff;
  font-size: 14px;
  width: 80%;
  outline: none;
//   &::placeholder {
//   color: rgba(204, 204, 204, 0.5);
//   }
`;

const LoginButton = styled.button`
  border: 0;
  border-radius: 30px;
  background-color: #ee3a57;
  color: #fff;
  width: 100%;
  height: 50px;
  margin: 15px 0 0 0;
  padding: 0 0 1.5px 0;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  &:hover {
    transition: 0.2s;
    background-color: transparent;
    border: 1px solid #ff5974;
  }
`; 

const SignupBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 18px 0 0;
`;

const SignupLink = styled.a`
  display: inline-block;
  text-align: center;
  width: 46px;
  cursor: pointer;
  font-size: 12.5px;
  color: rgba(204, 204, 204, 0.8);
  border-bottom: 1px solid rgba(204, 204, 204, 0.8);
  &:hover {
      transition: 0.2s;
    color: rgba(204, 204, 204);
  }
`;

export default Login;


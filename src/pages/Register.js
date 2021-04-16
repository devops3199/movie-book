import React, { useRef } from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from 'redux/modules/user';
import { idCheck, pwMacth, pwContinuous, emailCheck } from 'shared/common';

import { faEye as farEye } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash as farEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faUser, faLock, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = (props) => {

  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const changeEye = () => {
      setShow(show? false : true);
  };
  const changeEye2 = () => {
      setShow2(show2? false : true);
  };


  const [email, setEmail] = React.useState('');
  const [emailDup, setEmailDup] = React.useState(true);
  const [userName, setUserName] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [pwCheck, setPwCheck] = React.useState('');

  const signUp = () => {
    if (email === "" || userName === "" || pw === "" || pwCheck === "") {
      return;
    }
    
    if (pw !== pwCheck) {
      return;
    }

    dispatch(userActions.signupAPI(email, pw, pwCheck, userName));
  }

  const checkEmailAPI = (email) => {
    
    const API = `http://13.209.47.134/api/signup/${email}`;
    fetch(API)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res === true) {
        emailInfo.current.style.color = '#ee3a57';
        setMessageEmail('·이미 등록된 이메일입니다. 다시 작성해 주십시오!');
        console.log('이미 등록된 이메일입니다. 다시 작성해 주십시오!');
        setEmailDup(true);

      } else {
        setMessageEmail('·사용이 가능한 이메일입니다.');
        emailInfo.current.style.color = '#8ff6ff';
        console.log('사용이 가능한 이메일입니다.');
        setEmailDup(false);
      }
    });
  }

  // const checkPw = () => {
  //   // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
  //   let passRule = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    
  //   if(!passRule.test)
  // }

  const emailInfo = useRef();
  const usernameInfo = useRef();
  const pwInfo = useRef();
  const pwCheckInfo = useRef();
  const [messageEmail, setMessageEmail] = React.useState('');
  const [messageUsername, setMessageUsername] = React.useState('');
  const [messagePw, setMessagePw] = React.useState('');
  const [messagePwCheck, setMessagePwCheck] = React.useState('');

  const checkEm = () => {
    if (email === '') {
      setMessageEmail('·이메일을 입력해주세요.');
      emailInfo.current.style.color = '#ee3a57';
      emailInfo.current.style.display = 'block';
      console.log('이메일을 입력해주세요.');
      return;
    } else {
      emailInfo.current.style.display = 'none';
    }

    if (!emailCheck(email)) {
      setMessageEmail('·이메일 형식을 지켜주세요!');
      emailInfo.current.style.color = '#ee3a57';
      emailInfo.current.style.display = 'block';
      console.log('이메일 형식을 지켜주세요!');
      return;
    } else {
      emailInfo.current.style.display = 'none';
    }
    emailInfo.current.style.display = 'block';
    checkEmailAPI(email);
  }

  const checkUsername = () => {
    if (userName === '') {
      setMessageUsername('·이름을 입력해주세요.');
      usernameInfo.current.style.display = 'block';
      console.log('이름을 입력해주세요.');
      return;
    } else {
      usernameInfo.current.style.display = 'none';
    }
  }

  const checkPw = () => {
    if (pw === '') {
      setMessagePw('·비밀번호를 입력해주세요.');
      pwInfo.current.style.display = 'block';
      console.log('비밀번호를 입력해주세요.');
      return;
    } else {
      pwInfo.current.style.display = 'none';
    }

    // if (!pwMacth(pw)) {
    //   setMessagePw('·형식에 맞게 비밀번호를 입력해주세요.');
    //   pwInfo.current.style.display = 'block';
    //   console.log('형식에 맞게 비밀번호를 입력해주세요.');
    //   return;
    // } else {
    //   pwInfo.current.style.display = 'none';
    // }
  }

  const doubleCheckPw = () => {
    if (pwCheck === '') {
      setMessagePwCheck('·한 번 더 비밀번호를 입력해주세요.');
      pwCheckInfo.current.style.display = 'block';
      console.log('한 번 더 비밀번호를 입력해주세요.');
      return;
    } else {
      pwCheckInfo.current.style.display = 'none';
    }

    if (pw !== pwCheck) {
      setMessagePwCheck('·동일한 비밀번호를 입력해주세요.');
      pwCheckInfo.current.style.display = 'block';
      console.log('동일한 비밀번호를 입력해주세요.');
      return;
    } else {
      pwCheckInfo.current.style.display = 'none';
    }
  }

  return (
    <Wrap>
      <Title>회원가입</Title>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faEnvelope} />
        </IconSpan>
        <SignupInput type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} onBlur={checkEm}></SignupInput>
      </SignupBox>
      <InfoUl ref={emailInfo}>
        <li>{messageEmail}</li>
      </InfoUl> 

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faUser} />
        </IconSpan>
        <SignupInput type="text" placeholder="Username" onChange={(e) => { setUserName(e.target.value) }} onBlur={checkUsername}></SignupInput>
      </SignupBox>
      <InfoUl ref={usernameInfo}>
        <li>{messageUsername}</li>
      </InfoUl> 

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faLock} />
        </IconSpan>
        <PwdInput type={show? "text" : "password"} placeholder="Password" onChange={(e) => { setPw(e.target.value) }} onBlur={checkPw}>
        </PwdInput>
        <IconEyeSpan onClick={changeEye}>

          {show? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}
        </IconEyeSpan>
      </SignupBox>
      <InfoUl ref={pwInfo}>
        <li>{messagePw}</li>
      </InfoUl>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faLock} />
        </IconSpan>
        <PwdInput type={show2? "text" : "password"} placeholder="Confirm Password" onChange={(e) => { setPwCheck(e.target.value) }} onBlur={doubleCheckPw}>
        </PwdInput>
        <IconEyeSpan onClick={changeEye2}>
          
          {show2? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}
        </IconEyeSpan>
      </SignupBox>
      <InfoUl ref={pwCheckInfo}>
        <li>{messagePwCheck}</li>
      </InfoUl>
      
      <SignupButton onClick={signUp} >회원가입</SignupButton>

      <LoginBox>
        <LoginLink onClick={() => history.push('/login')} >로그인</LoginLink>
      </LoginBox>
      
    </Wrap>
  );
}

const InfoUl = styled.ul`
  display: none;
  width: 250px;
  list-style-type: none;
  font-size: 12px;
  color: #ee3a57;
  position: relative;
  top: -6px;
  left: -35px;
  font-weight: 400;
`

const Wrap = styled.div`
  width: 280px;
  height: 70vh;
  margin: 0 auto;
  padding: 150px 0;
  box-sizing: border-box;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 21px;
  width: 100%;
  text-align: center;
  margin: 0 0 40px;
`;

const SignupBox = styled.div`
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  width: 100%;
  height: 46px;
  margin: 0 0 15px;
  padding: 8px 0;
  box-sizing: border-box;
  overflow: hidden;

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

const IconEyeSpan = styled.span`
  width: 26px;
  float: right;
  text-align: center;
  padding: 3px 0 0;
  font-size: 14px;
  cursor: pointer;
  color: rgba(204, 204, 204);
`;

const SignupInput = styled.input`
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

const PwdInput = styled.input`
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  letter-spacing: -.05em;
  letter-spacing: 0.5px;
  overflow: hidden;
  color: #fff;
  font-size: 14px;
  width: 76%;
  outline: none;
`;

const SignupButton = styled.button`
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

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 18px 0 0;
`;

const LoginLink = styled.a`
  display: inline-block;
  text-align: center;
  width: 36px;
  cursor: pointer;
  font-size: 12.5px;
  color: rgba(204, 204, 204, 0.8);
  border-bottom: 1px solid rgba(204, 204, 204, 0.8);
  &:hover {
      transition: 0.2s;
    color: rgba(204, 204, 204);
  }
`;

export default Register;


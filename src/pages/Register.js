import React from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';

import { faEye as farEye } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash as farEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faUser, faLock, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = (props) => {

  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const changeEye = () => {
      setShow(show? false : true);
  };
  const changeEye2 = () => {
      setShow2(show2? false : true);
  };

  return (
    <Wrap>
      <Title>회원가입</Title>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faEnvelope} />
        </IconSpan>
        <SignupInput type="text" placeholder="Email" ></SignupInput>
      </SignupBox>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faUser} />
        </IconSpan>
        <SignupInput type="text" placeholder="Username" ></SignupInput>
      </SignupBox>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faLock} />
        </IconSpan>
        <PwdInput type={show? "text" : "password"} placeholder="Password" ></PwdInput>
        <IconEyeSpan onClick={changeEye}>

          {show? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}
        </IconEyeSpan>
      </SignupBox>

      <SignupBox>
        <IconSpan>
          <FontAwesomeIcon icon={faLock} />
        </IconSpan>
        <PwdInput type={show2? "text" : "password"} placeholder="Confirm Password" ></PwdInput>
        <IconEyeSpan onClick={changeEye2}>
          
          {show2? <FontAwesomeIcon icon={farEyeSlash} /> : <FontAwesomeIcon icon={farEye} />}
        </IconEyeSpan>
      </SignupBox>
      
      <SignupButton>회원가입</SignupButton>

      <LoginBox>
        <LoginLink onClick={() => history.push('/login')} >로그인</LoginLink>
      </LoginBox>
      
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 280px;
  height: 100%;
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
  width: 70%;
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


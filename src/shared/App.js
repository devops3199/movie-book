import React from 'react';

import 'shared/css/App.css';
import styled from 'styled-components';
import Logo from 'media/mb_logo.png';
import { Up } from 'media/Svg';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { history } from 'redux/configureStore';

import { Login, Register, Main, Detail, Result, MyMovie } from 'pages/page';
import NavBar from 'components/NavBar';
import NotFound from 'shared/NotFound';

import {actionCreators as userActions} from "redux/modules/user";

const App = (props) => {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem('token')? true : false ;
  const top = React.useRef();

  const GoTopShow = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if(scrollTop > 0){
      top.current.style.opacity = 1;
      top.current.style.cursor = 'pointer';
    } else {
      top.current.style.opacity = 0;
      top.current.style.cursor = 'none';
    }
  };

  React.useEffect(() => {
    if(is_login){
      dispatch(userActions.isLogin());
    }
    window.addEventListener('scroll', GoTopShow);

    return () => window.removeEventListener('scroll', GoTopShow);
  }, []);

  const GoTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <BodyContainer>
      <Header>
        <NavBar />
      </Header>
        <Container>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/detail/:id" exact component={Detail} />
              <Route path="/mymovie" exact component={MyMovie} />
              <Route path="/result" exact component={Result} />
              <Route component={NotFound} />
            </Switch>
          </ConnectedRouter>
        </Container>
      <Footer>
        <FooterContainer>
          <FooterLogo>
            <span>
              <img src={Logo} width='180px' />
            </span>
          </FooterLogo>
          <FooterText>
            <span>무비북 이용약관 | 개인정보처리방침 | 영화서비스 이용약관</span>
          </FooterText>
        </FooterContainer>
      </Footer>
      <Top ref={top} onClick={GoTop}>
        <Up/>
      </Top>
    </BodyContainer>
  );
}

const BodyContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  height: 100%;
  padding-bottom: 180px;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #181818;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  background-color: #181818;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  height: 100%;

  & span {
    font-size: 25px;
    font-weight: 700;
  }
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;

  & span {
    font-size: 18px;
    font-weight: 700;
  }
`;

const Top = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  background-color: #00a2c7;
  border-radius: 30px;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .3s;

  & svg {
    width: 2rem;
    fill: #fff;
  }
`;

export default App;

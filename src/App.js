import React from 'react';
import 'App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'redux/configureStore';
import NavBar from 'components/NavBar';
import { Login, Register, Main, Detail, Result, MyMovie } from 'pages/page';
import styled from 'styled-components';
import Logo from 'media/movie_book.png';

const App = (props) => {

  React.useEffect(() => {
    //로그인 체크
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
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/detail/:id" exact component={Detail} />
            <Route path="/result" exact component={Result} />
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
      <Top onClick={GoTop}>
        <svg viewBox="0 0 512 512">
            <g transform="translate(-1)">
              <path d="M402.067,179.2l-128-170.667c-8.533-11.378-25.6-11.378-34.133,0l-128,170.667
                c-10.548,14.064-0.513,34.133,17.067,34.133h64v85.333c0,11.782,9.551,21.333,21.333,21.333h85.333
                c11.782,0,21.333-9.551,21.333-21.333v-85.333h64C402.58,213.333,412.614,193.264,402.067,179.2z M299.667,170.667
                c-11.782,0-21.333,9.551-21.333,21.333v85.333h-42.667V192c0-11.782-9.551-21.333-21.333-21.333h-42.667L257,56.889
                l85.333,113.778H299.667z"/>
              <path d="M299.667,341.333h-85.333c-11.782,0-21.333,9.551-21.333,21.333S202.551,384,214.333,384h85.333
                c11.782,0,21.333-9.551,21.333-21.333S311.449,341.333,299.667,341.333z"/>
              <path d="M299.667,405.333h-85.333c-11.782,0-21.333,9.551-21.333,21.333S202.551,448,214.333,448h85.333
                c11.782,0,21.333-9.551,21.333-21.333S311.449,405.333,299.667,405.333z"/>
              <path d="M299.667,469.333h-85.333c-11.782,0-21.333,9.551-21.333,21.333S202.551,512,214.333,512h85.333
                c11.782,0,21.333-9.551,21.333-21.333S311.449,469.333,299.667,469.333z"/>
            </g>
          </svg>
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
  background-color: #1a1f3f;
  z-index: 10;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 180px;
  background-color: #1a1f3f;
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
  background-color: #ee3a57;
  border-radius: 10px;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 2rem;
    fill: #fff;
  }
`;

export default App;

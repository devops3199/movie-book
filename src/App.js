import React, { createContext, useState } from 'react';
import 'App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'redux/configureStore';
import NavBar from 'components/NavBar';
import { Login, Register, Main, Detail, Result } from 'pages/page';
import styled from 'styled-components';

export const KeywordContext = createContext();

const App = (props) => {

  const [keyword, setKeyword] = useState('');

  React.useEffect(() => {
    //로그인 체크
  }, []);

  return (
    <KeywordContext.Provider value={{ keyword, setKeyword }}>
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
              <span>MovieBook</span>
            </FooterLogo>
            <FooterText>
              <span>MovieBook 이용약관 | 개인정보처리방침 | 영화서비스 이용약관</span>
            </FooterText>
          </FooterContainer>
        </Footer>
      </BodyContainer>
    </KeywordContext.Provider>
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

export default App;

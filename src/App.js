import React from 'react';
import 'App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'redux/configureStore';
import NavBar from 'components/NavBar';
import { Login, Register, Main, Detail } from 'pages/page';
import styled from 'styled-components';

const App = (props) => {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <Container>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/detail" exact component={Detail} />
        </ConnectedRouter>
      </Container>
      <Footer>

      </Footer>
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  height: 100%;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #1a1f3f;
  z-index: 10;
`;

const Footer = styled.footer`
  width: 100%;
  height: 300px;
`;

export default App;

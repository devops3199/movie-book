import React from 'react';
import 'App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'redux/configureStore';
import NavBar from 'components/NavBar';
import { Login, Register, Main } from 'pages/page';
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
        </ConnectedRouter>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1350px;
  height: 100%;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #1a1f3f;
`;

export default App;

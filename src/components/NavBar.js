import React from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';

const NavBar = (props) => {

    return (
        <Navbar>
            <LogoContiner>
                <span onClick={() => {
                    history.push('/');
                }}>MovieBook</span>
            </LogoContiner>
            <ContentContainer>
                <input type='text' placeholder='영화 검색' />
                <button onClick={() => {
                    history.push('/login');
                }}>로그인</button>
            </ContentContainer>
        </Navbar>
    );
};

const Navbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1350px;
    height: 70px;
    margin: 0 auto;
`;

const LogoContiner = styled.div`
    & span {
        cursor: pointer;
        font-size: 25px;
        font-weight: 700;
    }
`;

const ContentContainer = styled.div`

`;

export default NavBar;
import React from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';

const NavBar = (props) => {

    return (
        <Navbar>
            <div>
                <span onClick={() => {
                    history.push('/');
                }}>로고</span>
            </div>
            <div>
                <input type='text' placeholder='영화 검색' />
                <button onClick={() => {
                    history.push('/login');
                }}>로그인</button>
            </div>
        </Navbar>
    );
};

const Navbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    border: 1px solid #efefef;
    //box-shadow: 0px 7px 12px -3px #818181;
`;

export default NavBar;
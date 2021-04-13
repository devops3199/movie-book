import React from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NavBar = (props) => {

    return (
        <Navbar>
            <LogoContiner>
                <span onClick={() => {
                    history.push('/');
                }}>MovieBook</span>
            </LogoContiner>
            <ContentContainer>
                <SearchContainer>
                    <Search type='text' placeholder='영화 검색' />
                    <button>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </SearchContainer>
                <ButtonContainer>
                    <button onClick={() => {
                        history.push('/login');
                    }}>로그인</button>
                    <button onClick={() => {
                        history.push('/register');
                    }}>회원가입</button>
                </ButtonContainer>
            </ContentContainer>
        </Navbar>
    );
};

const Navbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
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
    display: flex;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid #fff;
    border-radius: 20px;
    background-color: transparent;
    box-sizing: border-box;
    height: 40px;
    outline: none;
    color: #fff;
    padding-left: 20px;
    margin-right: 5px;

    & button {
        width: 1.5rem;
        height: 1.5rem;
        background-color: transparent;
        color: #fff;
        border: 0;
        outline: none;
        cursor: pointer;

        :hover {
            border: 0;
            outline: none;
        }
    }
`;

const Search = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    color: #fff;
    width: 85%;
`;

const ButtonContainer = styled.div`
    & button {
        border: 0;
        border-radius: 5px;
        background-color: #ee3a57;
        color: #fff;
        width: 100px;
        margin: 0 .5rem;
        padding: 10px 0;
        cursor: pointer;
        outline: none;

        &:hover {
            transition: 0.2s;
            background-color: transparent;
            border: 1px solid #ee3a57;
        }
    }
`;

export default NavBar;
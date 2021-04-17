import React, { useContext } from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';
import {getLocal, deleteLocal} from "shared/Local";
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from 'redux/modules/user';
import { actionCreators as movieActions } from 'redux/modules/movie';

import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { KeywordContext } from 'App';

const NavBar = (props) => {

    const dispatch = useDispatch();

    const {setKeyword} = useContext(KeywordContext);

    const is_login = useSelector((state) => state.user.is_login);
    const userInfo = useSelector((state) => state.user.user);
    const [keywordClick, setKeywordClick] = React.useState('');
    
    const SearchMovie = () => {
        dispatch(movieActions.clearSearchPage());
        history.push('/result');
    };

    return (
        <Navbar>
            <LogoContiner>
                <span onClick={() => {
                    history.push('/');
                }}>MovieBook</span>
            </LogoContiner>
            <ContentContainer>
                <SearchContainer>
                    <Search type='text' placeholder='영화 검색' onChange={(e) => {setKeywordClick(e.target.value)}} onKeyUp={(e) => {
                        if(window.event.keyCode === 13) {
                            console.log("click")
                            setKeyword(e.target.value);
                            SearchMovie();
                        } 
                    }} />
                    <button>
                        <FontAwesomeIcon icon={faSearch} onClick={() => {
                            setKeyword(keywordClick);
                            SearchMovie();
                        }} />
                    </button>
                </SearchContainer>
                {!is_login && (
                    <React.Fragment>
                        <ButtonContainer>
                            <button onClick={() => {
                                history.push('/login');
                            }}>로그인</button>
                            <button onClick={() => {
                                history.push('/register');
                            }}>회원가입</button>
                        </ButtonContainer>
                    </React.Fragment>
                )}
                {is_login && (
                    <React.Fragment>
                        <ButtonContainer>
                            <button onClick={() => {
                                history.push('/');
                            }}>내 영화</button>
                            <button onClick={() => {
                                dispatch(userActions.logout({}));
                            }}>로그아웃</button>
                        </ButtonContainer>
                    </React.Fragment>
                )}
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
        border: 1px solid #ee3a57;
        border-radius: 5px;
        background-color: #ee3a57;
        color: #fff;
        width: 100px;
        margin: 0 .5rem;
        padding: 10px 0;
        cursor: pointer;
        outline: none;

        &:hover {
            background-color: transparent;
            border: 1px solid #ee3a57;
        }
    }
`;

export default NavBar;
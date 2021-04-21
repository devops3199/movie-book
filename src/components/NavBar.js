import React from 'react';
import styled from 'styled-components';
import { history } from 'redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from 'redux/modules/user';
import { actionCreators as movieActions } from 'redux/modules/movie';

import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from 'media/mb_logo.png';

const NavBar = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const [keyword, setKeyword] = React.useState('');
    
    const SearchMovie = () => {
        dispatch(movieActions.getMoiveSearch(keyword));
        history.push('/result');
    };

    React.useEffect(() => {
        dispatch(userActions.isLogin());
    }, []);
    
    return (
        <Navbar className="header">
            <LogoContiner>
                <span onClick={() => {
                    history.push('/');
                }}>
                    <img src={Logo} width='180px' />
                </span>
            </LogoContiner>
            <ContentContainer>
                <SearchContainer>
                    <Search type='text' placeholder='영화 검색' onChange={(e) => {setKeyword(e.target.value)}} onKeyPress={(e) => {
                        if(window.event.keyCode === 13) {
                            SearchMovie();
                        } 
                    }} />
                    <button>
                        <FontAwesomeIcon icon={faSearch} onClick={() => {
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
                                history.push('/mymovie');
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
    height: 80px;
    margin: 0 auto;
`;

const LogoContiner = styled.div`
    margin: 0 0 0 -7px;
    & span {
        cursor: pointer;
        font-size: 20px;
        font-weight: 700;
        & img {
            font-size: 16px;
        }
    }
`;

const ContentContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 20px;
    background-color: transparent;
    box-sizing: border-box;
    height: 34px;
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
    display: flex;
    align-items: center;
    margin: 0 8px 0 0;
    & button {
        border: 2px solid #00a2c7;
        border-radius: 30px;
        background-color: #00a2c7;
        color: #fff;
        width: 100px;
        margin: 0 .5rem;
        padding: 0;
        cursor: pointer;
        outline: none;
        height: 34px;
        &:hover {
            background-color: transparent;
            border: 1px solid #00a2c7;
            transition: 0.2s;
        }
    }
`;

export default NavBar;
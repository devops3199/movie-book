import React from 'react';
import styled from 'styled-components';
import { Previous, Next } from 'media/Svg';
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Carousel = (props) => {
    const slide_temp = new Array(6).fill(0);
    const slider_container = React.useRef();
    const prev = React.useRef();
    const next = React.useRef();
    const [current_index, setCurrentIndex] = React.useState(0); // 현재 보여지는 슬라이더

    const MoveSlide = (index) => {
        let slider = slider_container.current;
        console.log(slider);
        slider.style.left = (-100 * index) + '%'; // 좌측으로 이동
        setCurrentIndex(index);

        // 버튼 활성화 설정
        if(index === 5) {
            next.current.style.display = 'none';
        } else if (index === 0) {
            prev.current.style.display = 'none';
        } else {
            next.current.style.display = 'flex';
            prev.current.style.display = 'flex';
        }
    };

    React.useEffect(() => {
        prev.current.style.display = 'none';
    }, []);

    return (
        <CarouselContainer>
            <PrevContainer ref={prev} onClick={() => { MoveSlide(current_index - 1) }}>
                <Previous />
            </PrevContainer>
            <NextContainer ref={next} onClick={() => { MoveSlide(current_index + 1) }}>
                <Next />
            </NextContainer>
            <SliderContainer ref={slider_container}>
                {slide_temp.map((val, index) => {
                    let value = index * 100;
    
                    const slide_style = {
                        left: `${value}%`,
                    };

                    return(
                        <Slider key={index} style={slide_style}>
                            <MovieWrapper>
                                <Movie>
                                    <Detail>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Detail>
                                    <Poster />
                                    <Title>
                                        <span>서복 (2021)</span>
                                    </Title>
                                </Movie>
                                <Movie>
                                    <Detail>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Detail>
                                    <Poster />
                                    <Title>
                                        <span>서복 (2021)</span>
                                    </Title>
                                </Movie>
                                <Movie>
                                    <Detail>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Detail>
                                    <Poster />
                                    <Title>
                                        <span>서복 (2021)</span>
                                    </Title>
                                </Movie>
                                <Movie>
                                    <Detail>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Detail>
                                    <Poster />
                                    <Title>
                                        <span>서복 (2021)</span>
                                    </Title>
                                </Movie>
                            </MovieWrapper>
                        </Slider>
                    );
                })}
            </SliderContainer>
        </CarouselContainer>
    );
};

const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    height: 24.815rem;
    overflow: hidden;
    margin: 1rem 0;
`;

const SliderContainer = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    transition: left .5s ease-in;
`;

const Slider = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
`;

const MovieWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Movie = styled.div`
    position: relative;
    width: 15.625rem;
    height: 24.815rem;
    background-color: #1a1f3f;
    cursor: pointer;
    margin: 0 1.25rem;
    border-radius: 10px;
`;

const Poster = styled.div`
    width: 100%;
    height: 21.565rem;
    margin-right: 1.25rem;
    background: url(https://img.hankyung.com/photo/202011/BF.24364787.1.jpg) no-repeat center;
    background-size: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const Title = styled.div`
    width: 100%;
    height: 3.25rem;
    display: flex;
    align-items: center;

    & span {
        margin-left: 0.5rem;
        font-weight: 700;
    }
`;

const Detail = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(238, 58, 87, .3);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .5s;

    & svg {
        font-size: 2rem;
    }

    :hover {
        opacity: 1;
    }
`;

const PrevContainer = styled.div`
    z-index: 1;
    position: absolute;
    top: 40%;
    left: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ee3a57;
    border-radius: 50%;

    & svg {
        fill: #fff;
        width: 1.5rem;
        height: 1.5rem;
    }
`;

const NextContainer = styled.div`
    z-index: 1;
    position: absolute;
    top: 40%;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ee3a57;
    border-radius: 50%;

    & svg {
        fill: #fff;
        width: 1.5rem;
        height: 1.5rem;
    }
`;

export default Carousel;
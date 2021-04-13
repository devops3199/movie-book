import React from 'react';
import styled from 'styled-components';
import { Previous, Next } from 'media/Svg';

const Carousel = (props) => {
    const slide_temp = new Array(6).fill(0);
    const slider_container = React.useRef();
    const [current_index, setCurrentIndex] = React.useState(0); // 현재 보여지는 슬라이더

    const MoveSlide = (index) => {
        let slider = slider_container.current;
        console.log(slider);
        slider.style.left = (-100 * index) + '%'; // 좌측으로 이동
        setCurrentIndex(index);
    };

    return (
        <CarouselContainer>
            <PrevContainer  onClick={() => { MoveSlide(current_index - 1) }}>
                <Previous />
            </PrevContainer>
            <NextContainer onClick={() => { MoveSlide(current_index + 1) }}>
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
                            <Movie>{index}</Movie>
                            <Movie></Movie>
                            <Movie></Movie>
                            <Movie></Movie>
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
    height: 16.75rem;
    overflow: hidden;
`;

const SliderContainer = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    transition: left .3s ease-in;
`;

const Slider = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
`;

const Movie = styled.div`
    width: 25%;
    border: 1px solid #fff;
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

    & svg {
        fill: #fff;
        width: 1.5rem;
        height: 1.5rem;
    }
`;

export default Carousel;
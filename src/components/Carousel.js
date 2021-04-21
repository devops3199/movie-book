import React from 'react';
import styled from 'styled-components';
import { Previous, Next } from 'media/Svg';
import MoiveCard from 'components/MovieCard';

const Carousel = (props) => {
    const slide_content = props.list;
    const lastIndex = Math.ceil(props.list.length/4);
    const slide_temp = new Array(lastIndex).fill(0);

    const slider_container = React.useRef();
    const prev = React.useRef();
    const next = React.useRef();
    const [current_index, setCurrentIndex] = React.useState(0); // 현재 보여지는 슬라이더

    const {history} = props;

    const MoveSlide = (index) => {
        let slider = slider_container.current;
        slider.style.left = (-100 * index) + '%'; // 좌측으로 이동
        setCurrentIndex(index);

        console.log(index, lastIndex, 'anj');

        // 버튼 활성화 설정
        if(index === lastIndex-1) {
            next.current.style.display = 'none';
            prev.current.style.display = 'flex';
        } else if (index === 0) {
            next.current.style.display = 'flex';
            prev.current.style.display = 'none';
        } else {
            next.current.style.display = 'flex';
            prev.current.style.display = 'flex';
        }
    };

    React.useEffect(() => {
        if(slide_content.length < 5) {
            next.current.style.display = 'none';
        }
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

                    let start = index * 4;
                    let end = start + 4;

                    let temp_arr = slide_content.slice(start, end);

                    return(
                        <Slider key={index} style={slide_style}>
                            <MovieWrapper>
                                {temp_arr.map((val, index) => {
                                    let full_title = `${val.movie.title} (${val.movie.opening_date})`;
                                    return (
                                        <MoiveCard key={index} margin='0 1.25rem' url={val.movie.image_url} title={full_title} rate={val.movie.rate} _onClick={() => {history.push(`/detail/${val.movie.m_id}`);}} />
                                    );
                                })}
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
    background-color: #06afd6;
    border-radius: 30px;
    opacity: 0;
    transition: opacity .3s;

    & svg {
        fill: #fff;
        width: 1.5rem;
        height: 1.5rem;
    }

    ${CarouselContainer}:hover & {
        opacity: 1;
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
    background-color: #06afd6;
    border-radius: 30px;
    opacity: 0;
    transition: opacity .3s;

    & svg {
        fill: #fff;
        width: 1.5rem;
        height: 1.5rem;
    }

    ${CarouselContainer}:hover & {
        opacity: 1;
    }
`;

export default Carousel;
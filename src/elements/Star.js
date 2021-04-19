import React from 'react';
import styled from 'styled-components';
import 'Star.css';

const Star = (props) => {
  const { setReviewStar } = props;
  const [ rating, setRating ] = React.useState(0);

  const starClick = (e) => {
    setRating(e.target.value);
    setReviewStar(e.target.value);
  };

  return (
    <React.Fragment>
      <Box>
        <Stars className="rating">
          <input type="radio" id="star10" name="rating" value="10" onChange={starClick} /><label htmlFor="star10" className="full"></label>
          <input type="radio" id="star9" name="rating" value="9" onChange={starClick} /><label htmlFor="star9" className="half"></label>
          <input type="radio" id="star8" name="rating" value="8" onChange={starClick} /><label htmlFor="star8" className="full"></label>
          <input type="radio" id="star7" name="rating" value="7" onChange={starClick} /><label htmlFor="star7" className="half"></label>
          <input type="radio" id="star6" name="rating" value="6" onChange={starClick} /><label htmlFor="star6" className="full"></label>
          <input type="radio" id="star5" name="rating" value="5" onChange={starClick} /><label htmlFor="star5" className="half"></label>
          <input type="radio" id="star4" name="rating" value="4" onChange={starClick} /><label htmlFor="star4" className="full"></label>
          <input type="radio" id="star3" name="rating" value="3" onChange={starClick} /><label htmlFor="star3" className="half"></label>
          <input type="radio" id="star2" name="rating" value="2" onChange={starClick} /><label htmlFor="star2" className="full"></label>
          <input type="radio" id="star1" name="rating" value="1" onChange={starClick} /><label htmlFor="star1" className="half"></label>
        </Stars>
        <Num>{rating}</Num>
      </Box>
    </React.Fragment>
  )
}

Star.defaultProps = {

}

const Box = styled.div`
  margin: 0;
  padding: 0;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Stars = styled.div`
  margin-top: 5px;
  
`;

const Num = styled.span`
  margin: 0;
  padding: 0;
  height: 100%;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;

`;

export default Star;
import React from 'react';
import styled from 'styled-components';
import 'Star.css';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'


const Star = (props) => {

  const [ rating, setRating ] = React.useState(null);

  const starClick = (e) => {
    setRating(e.target.value);
  };

  return (
    <React.Fragment>
      <Box>
        <Stars className="rating">
          <input type="radio" id="star10" name="rating" value="10" onChange={starClick} /><label for="star10" class="full"></label>
          <input type="radio" id="star9" name="rating" value="9" onChange={starClick} /><label for="star9" class="half"></label>
          <input type="radio" id="star8" name="rating" value="8" onChange={starClick} /><label for="star8" class="full"></label>
          <input type="radio" id="star7" name="rating" value="7" onChange={starClick} /><label for="star7" class="half"></label>
          <input type="radio" id="star6" name="rating" value="6" onChange={starClick} /><label for="star6" class="full"></label>
          <input type="radio" id="star5" name="rating" value="5" onChange={starClick} /><label for="star5" class="half"></label>
          <input type="radio" id="star4" name="rating" value="4" onChange={starClick} /><label for="star4" class="full"></label>
          <input type="radio" id="star3" name="rating" value="3" onChange={starClick} /><label for="star3" class="half"></label>
          <input type="radio" id="star2" name="rating" value="2" onChange={starClick} /><label for="star2" class="full"></label>
          <input type="radio" id="star1" name="rating" value="1" onChange={starClick} /><label for="star1" class="half"></label>
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
  gap: 16px;
`;

const Stars = styled.div`
  margin-top: 5px;
  
`;

const Num = styled.span`
  margin: 0;
  padding: 0;
  height: 100%;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;

`;

export default Star;
import React from 'react';
import styled from 'styled-components';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'


const Star = (props) => {

  const [rating, setRating] = React.useState(null);
  const [hover, setHover] = React.useState(null);

  return (
    <React.Fragment>
      <Box>
        <Stars>
          {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
            return (
                <label>
                  <StarInput 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={() => setRating(ratingValue)}
                  />
                  <FontAwesomeIcon 
                    icon={faStar} 
                    color={ratingValue <= (hover || rating) ? "#ee3a57" : "#d1d1d1"}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
            );
          })}
        </Stars>
        <Num>{rating}</Num>
      </Box>
    </React.Fragment>
  )
}

Star.defaultProps = {

}

const StarInput = styled.input`
  display: none;
`;

const Box = styled.div`
  margin: 0;
  padding: 0;
  height: 50px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const Stars = styled.div`
  margin: 5px 0 0;
  padding: 0;
  font-size: 1rem;
  display: flex;
  gap: 3px;
`;

const Num = styled.div`
  margin: 2.4px 0 0;
  padding: 0;
  height: 30px;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  display: inline-flex;
`;

export default Star;
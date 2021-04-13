import React from 'react';
import styled from 'styled-components';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Star = (props) => {

  const [clicked, setClicked] = React.useState([false, false, false, false, false]);

  return (
    <React.Fragment>
      <Box>
        <Stars>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </Stars>
        <Num>5.0</Num>
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
  align-items: flex-start;
  gap: 16px;
`;

const Stars = styled.div`
  margin: 8px 0 0;
  padding: 0;
  color: #ee3a57;
  font-size: 1rem;
  display: flex;
  gap: 4px;
`;

const Num = styled.div`
  margin: 0;
  padding: 0;
  height: 30px;
  font-size: 1.25rem;
  font-weight: 700;
  display: inline-flex;
//   box-sizing : border-box;
`;

export default Star;
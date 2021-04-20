import React from 'react';
import styled from 'styled-components';
import 'shared/css/EditStar.css';

const EditStar = (props) => {
  const { setEditStar } = props;
  const [ editRating, setEditRating ] = React.useState(0);

  const editStarClick = (e) => {
    setEditRating(e.target.value);
    setEditStar(e.target.value);
  };

  return (
    <React.Fragment>
      <Box>
        <Stars className="e_rating">
          <input type="radio" id="e_star10" name="rating" value="10" onChange={editStarClick} /><label htmlFor="e_star10" className="e_full"></label>
          <input type="radio" id="e_star9" name="rating" value="9" onChange={editStarClick} /><label htmlFor="e_star9" className="e_half"></label>
          <input type="radio" id="e_star8" name="rating" value="8" onChange={editStarClick} /><label htmlFor="e_star8" className="e_full"></label>
          <input type="radio" id="e_star7" name="rating" value="7" onChange={editStarClick} /><label htmlFor="e_star7" className="e_half"></label>
          <input type="radio" id="e_star6" name="rating" value="6" onChange={editStarClick} /><label htmlFor="e_star6" className="e_full"></label>
          <input type="radio" id="e_star5" name="rating" value="5" onChange={editStarClick} /><label htmlFor="e_star5" className="e_half"></label>
          <input type="radio" id="e_star4" name="rating" value="4" onChange={editStarClick} /><label htmlFor="e_star4" className="e_full"></label>
          <input type="radio" id="e_star3" name="rating" value="3" onChange={editStarClick} /><label htmlFor="e_star3" className="e_half"></label>
          <input type="radio" id="e_star2" name="rating" value="2" onChange={editStarClick} /><label htmlFor="e_star2" className="e_full"></label>
          <input type="radio" id="e_star1" name="rating" value="1" onChange={editStarClick} /><label htmlFor="e_star1" className="e_half"></label>
        </Stars>
        <Num>{editRating}</Num>
      </Box>
    </React.Fragment>
  )
}

EditStar.defaultProps = {

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
  color: #303030;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export default EditStar;
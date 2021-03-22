import React from 'react';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';
import './Stars.css';

class Stars extends React.Component {
  render() {
    const one = 1;
    const two = 2;
    const three = 3;
    const four = 4;
    const five = 5;
    const { clickedStars, aOc } = this.props;
    return (
      <div className="stars">
        <button type="button" onClick={ () => clickedStars(one) }>
          <AiFillStar className={ aOc[0] ? 'clicked' : 'notClicked' } />
        </button>
        <button type="button" onClick={ () => clickedStars(two) }>
          <AiFillStar className={ aOc[1] ? 'clicked' : 'notClicked' } />
        </button>
        <button type="button" onClick={ () => clickedStars(three) }>
          <AiFillStar className={ aOc[2] ? 'clicked' : 'notClicked' } />
        </button>
        <button type="button" onClick={ () => clickedStars(four) }>
          <AiFillStar className={ aOc[3] ? 'clicked' : 'notClicked' } />
        </button>
        <button type="button" onClick={ () => clickedStars(five) }>
          <AiFillStar className={ aOc[4] ? 'clicked' : 'notClicked' } />
        </button>
      </div>
    );
  }
}

Stars.propTypes = {
  clickedStars: PropTypes.func.isRequired,
  aOc: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default Stars;

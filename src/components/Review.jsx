import React from 'react';
import PropTypes from 'prop-types';
import './Review.css';

class Review extends React.Component {
  render() {
    const { review } = this.props;
    return (
      <div className="reviewItem">
        <p>{review.email}</p>
        <p>{ review.stars}</p>
        <p>{review.textArea}</p>
      </div>
    );
  }
}

Review.propTypes = {
  review: PropTypes.shape({
    email: PropTypes.string.isRequired,
    textArea: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
  }).isRequired,
};

export default Review;

import React from 'react';
import PropTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './TopNavBar.css';

class TopNavBar extends React.Component {
  render() {
    const { cartSize } = this.props;
    return (
      <div className="topNavBar">
        <Link className="cartLogo" to="/">YUB.COM </Link>
        <Link className="cartIcon" to="/shoppingCart" data-testid="shopping-cart-button">
          <FiShoppingCart />
          (
          <div data-testid="shopping-cart-size">
            { cartSize }
          </div>
          )
        </Link>
      </div>
    );
  }
}

TopNavBar.propTypes = {
  cartSize: PropTypes.number.isRequired,
};

export default TopNavBar;

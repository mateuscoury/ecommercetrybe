import React from 'react';
import PropTypes from 'prop-types';
import './ProductOnCart.css';

class ProductOnCart extends React.Component {
  render() {
    const { product, changeQtd } = this.props;
    const { thumbnail, title, amountToBuy, id, price } = product;
    const ONE = 1;
    const NEG = -1;
    return (
      <div className="productOnCart">
        <div className="cartImgDiv">
          <img src={ thumbnail } alt="Thumb" />
        </div>
        <h4 data-testid="shopping-cart-product-name">
          { title }
        </h4>
        <p className="cartPrice">{ `R$ ${price}`}</p>
        <div className="quantidadeDiv">
          <button
            type="button"
            onClick={ () => changeQtd(NEG, id) }
            data-testid="product-decrease-quantity"
          >
            -
          </button>
          <div data-testid="shopping-cart-product-quantity">
            { +amountToBuy }
          </div>
          <button
            type="button"
            onClick={ () => changeQtd(ONE, id) }
            data-testid="product-increase-quantity"
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

ProductOnCart.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  changeQtd: PropTypes.func.isRequired,
};

export default ProductOnCart;

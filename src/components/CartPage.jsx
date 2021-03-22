import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductOnCart from './ProductOnCart';
import './CartPage.css';

class CartPage extends React.Component {
  constructor() {
    super();
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
  }

  calculateTotalPrice() {
    const { productsOnCart } = this.props;
    const totalPrice = productsOnCart.reduce((acc, curr) => {
      acc += (curr.amountToBuy * curr.price);
      return acc;
    }, 0);
    return totalPrice;
  }

  renderCheckout() {
    const { totalItems } = this.props;
    let totalPrice = this.calculateTotalPrice();
    totalPrice = Math.floor(totalPrice * 100) / 100;
    return (
      <div className="totalPrice">
        <h1>Resumo da Compra</h1>
        <hr />
        <table>
          <tbody>
            <tr>
              <td className="leftSide">Qtd de itens</td>
              <td className="rightSide">{ totalItems }</td>
            </tr>
            <tr>
              <td className="leftSide">Subtotal</td>
              <td className="rightSide">{ `R$ ${totalPrice}`}</td>
            </tr>
            <tr>
              <td className="leftSide">Descontos</td>
              <td className="rightSide">R$0</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <table>
          <tbody>
            <tr>
              <td className="leftSide">TOTAL</td>
              <td className="rightSide">{ `R$ ${totalPrice}`}</td>
            </tr>
          </tbody>
        </table>
        <Link to="/checkout">
          <button type="button" data-testid="checkout-products">CHECKOUT</button>
        </Link>
      </div>
    );
  }

  render() {
    const { productsOnCart, changeQtd } = this.props;
    if (productsOnCart.length === 0) {
      return (
        <p
          className="emptyCart"
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>);
    }
    return (
      <div className="mainCartPage">
        <div className="listOfProducts">
          { productsOnCart.map((product) => (<ProductOnCart
            key={ product.id }
            product={ product }
            changeQtd={ changeQtd }
          />))}
        </div>
        { this.renderCheckout()}
      </div>
    );
  }
}

CartPage.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.any).isRequired,
  changeQtd: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default CartPage;

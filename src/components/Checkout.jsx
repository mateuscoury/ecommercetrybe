import React from 'react';
import PropTypes from 'prop-types';

import InforComprador from './InforComprador';
import MetodoPagmento from './MetodoPagamento';

import './Checkout.css';

class Checkout extends React.Component {
  render() {
    const { getFromLocalStorage } = this.props;
    const resumo = getFromLocalStorage();
    let result = resumo.reduce((acc, curr) => {
      acc += (curr.amountToBuy * curr.price);
      return acc;
    }, 0);
    result = Math.floor(result * 100) / 100;
    return (
      <div className="checkoutDiv">
        <fieldset className="resumoItemsDiv">
          <legend>Revise seus Produtos</legend>

          {resumo.map((arry) => (
            <div key={ arry.id } className="resumoCard">
              <img src={ arry.thumbnail } alt="img" />
              <p>{ arry.title }</p>
              <p>{ `Quantidade: ${arry.amountToBuy}`}</p>
              <p>{ `Preço: R$${arry.price * arry.amountToBuy}` }</p>
            </div>
          ))}
          <h1>
            Total R$
            { result }
          </h1>

        </fieldset>
        <div className="pagamento">
          <InforComprador />
          <MetodoPagmento />
        </div>
        <button type="button" className="checkoutBtn">Finalizar Compra</button>
      </div>
    );
  }
}

Checkout.propTypes = {
  getFromLocalStorage: PropTypes.func.isRequired,
};

export default Checkout;

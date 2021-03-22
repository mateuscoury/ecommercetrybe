import React from 'react';
import { AiOutlineBarcode, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';

import './MetodoPagmento.css';

class MetodoPagmento extends React.Component {
  render() {
    return (
      <fieldset className="metodosDiv">
        <legend>Método de pagamento</legend>

        <label htmlFor="boleto">
          <input
            type="radio"
            value="boleto"
            id="boleto"
            name="pagamento"
            defaultChecked
          />
          <AiOutlineBarcode />
          <p>Boleto</p>
        </label>
        <label htmlFor="visa">
          <input type="radio" value="visa" id="visa" name="pagamento" />

          <FaCcVisa />
          <p>Visa</p>
        </label>
        <label htmlFor="masterCard">
          <input type="radio" value="MasterCard" id="masterCard" name="pagamento" />

          <FaCcMastercard />
          <p>MasterCard</p>
        </label>
        <label htmlFor="elo">
          <input type="radio" value="Elo" id="elo" name="pagamento" />
          <AiOutlineLoading3Quarters />
          Elo
        </label>
      </fieldset>
    );
  }
}

export default MetodoPagmento;

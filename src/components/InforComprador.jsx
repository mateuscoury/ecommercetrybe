import React from 'react';
import './InforComprador.css';
import { estado } from '../services/estado';

class InforComprador extends React.Component {
  render() {
    return (
      <fieldset className="inputsDiv">
        <legend>Informações do Comprador</legend>
        <form>
          <input
            type="text"
            placeholder="Nome Completo"
            data-testid="checkout-fullname"
          />
          <input
            type="text"
            placeholder="CPF"
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            placeholder="Email"
            data-testid="checkout-email"
          />
          <input
            type="text"
            placeholder="Telefone"
            data-testid="checkout-phone"
          />
          <input
            type="text"
            placeholder="CEP"
            data-testid="checkout-cep"
          />
          <input
            type="text"
            placeholder="Endereço"
            data-testid="checkout-address"
          />
          <input type="text" placeholder="Complemento" />
          <input type="text" placeholder="Endereço" />
          <input type="text" placeholder="Número" />
          <select>
            { estado.map((arry, i) => (
              <option key={ i }>{ arry }</option>
            ))}
          </select>
        </form>
      </fieldset>
    );
  }
}

export default InforComprador;

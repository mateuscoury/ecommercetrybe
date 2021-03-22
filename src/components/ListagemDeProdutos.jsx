import React from 'react';
import PropTypes from 'prop-types';
import CardProducts from './CardProducts';
import Dropdown from './Dropdown';

class ListagemDeProdutos extends React.Component {
  render() {
    const { products, addCart, onChange } = this.props;

    if (products.length === 0) {
      return (
        <div className="zeroProducts">Nenhum produto foi encontrado</div>
      );
    }

    return (
      <div className="cardsDiv">
        <Dropdown onChange={ onChange } />
        { products.map((product) => (<CardProducts
          key={ product.id }
          product={ product }
          addCart={ addCart }
        />)) }
      </div>
    );
  }
}

ListagemDeProdutos.propTypes = {
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
  addCart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListagemDeProdutos;

import React from 'react';
import PropTypes from 'prop-types';
import ListagemDeProdutos from './ListagemDeProdutos';
import Search from './Search';

class MainPage extends React.Component {
  render() {
    const { categories, products, onclick, addCart, onChange, onClickInput } = this.props;
    return (
      <div className="mainPage">
        <Search onChange={ onChange } onClickInput={ onClickInput } />
        <div className="categoriesList">
          { categories.map(({ name, id }) => (
            <button
              type="button"
              key={ name }
              onClick={ () => onclick(id) }
              data-testid="category"

            >
              {name}
            </button>
          ))}
        </div>
        <ListagemDeProdutos
          products={ products }
          addCart={ addCart }
          onChange={ onChange }
        />
      </div>
    );
  }
}

MainPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  products: PropTypes.arrayOf(PropTypes.any).isRequired,
  onclick: PropTypes.func.isRequired,
  addCart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickInput: PropTypes.func.isRequired,
};

export default MainPage;

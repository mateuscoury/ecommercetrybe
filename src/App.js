import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import CartPage from './components/CartPage';
import './App.css';
import './services/api';
import TopNavBar from './components/TopNavBar';
import * as api from './services/api';
import MainPage from './components/MainPage';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.buscaDeProdutos = this.buscaDeProdutos.bind(this);
    this.buscaProdutosInput = this.buscaProdutosInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCart = this.addCart.bind(this);
    this.changeQtd = this.changeQtd.bind(this);
    this.state = {
      categories: [],
      products: [],
      productsOnCart: this.getFromLocalStorage(),
      totalItems: this.getFromLocalStorageTotal(),
    };
  }

  componentDidMount() {
    api.getCategories().then((result) => {
      this.setState(() => ({ categories: result }));
    });
  }

  handleChange(envet) {
    envet.preventDefault();
    const { name, value } = envet.target;
    if (name === 'select') {
      this.filterProducts(value);
    }
    this.setState({ [name]: value });
  }

  getFromLocalStorageTotal() {
    let currentLocal = window.localStorage.getItem('total');
    if (currentLocal === null) {
      currentLocal = 0;
    }
    return +currentLocal;
  }

  getFromLocalStorage() {
    let currentLocal = window.localStorage.getItem('cart');
    currentLocal = JSON.parse(currentLocal);
    if (currentLocal === null) {
      currentLocal = [];
    }
    return currentLocal;
  }

  filterProducts(value) {
    const { products } = this.state;
    if (value === 'Menor') {
      products.sort((a, b) => a.price - b.price);
    } else {
      products.sort((a, b) => b.price - a.price);
    }
  }

  saveOnLocalStorage(array, total) {
    array = JSON.stringify(array);
    window.localStorage.setItem('total', total);
    window.localStorage.setItem('cart', array);
  }

  buscaDeProdutos(id) {
    const { input } = this.state;
    api.getProductsFromCategoryAndQuery(id, input).then((result) => {
      this.setState(() => ({ products: result.results }));
    });
  }

  buscaProdutosInput() {
    const { input } = this.state;
    api.getProductsFromCategoryAndQuery('', input)
      .then(({ results }) => this.setState({
        products: results,
      }));
  }

  addCart(obj, amount = 1) {
    const { productsOnCart, totalItems } = this.state;
    const { id } = obj;
    if (!productsOnCart.includes(obj)) {
      obj.amountToBuy = amount;
      const local = this.getFromLocalStorage();
      local.push(obj);
      this.saveOnLocalStorage(local, (totalItems + amount));
      this.setState((old) => ({
        productsOnCart: [...old.productsOnCart, obj],
        totalItems: (old.totalItems + amount),
      }));
    } else {
      this.changeQtd(amount, id);
    }
  }

  changeQtd(num, idToChange) {
    const { productsOnCart, totalItems } = this.state;
    const newProductsOnCart = [...productsOnCart];
    const itemToChange = newProductsOnCart.find(({ id }) => id === idToChange);
    const { available_quantity: availableQtd } = itemToChange;
    const index = newProductsOnCart.indexOf(itemToChange);
    itemToChange.amountToBuy += num;
    let newTotalItems = totalItems + num;
    if (itemToChange.amountToBuy === 0) {
      newProductsOnCart.splice(index, 1);
    }
    if (itemToChange.amountToBuy > availableQtd) {
      itemToChange.amountToBuy = availableQtd;
      newTotalItems -= 1;
    }
    this.saveOnLocalStorage(newProductsOnCart, newTotalItems);
    this.setState(() => (
      {
        productsOnCart: newProductsOnCart,
        totalItems: newTotalItems,
      }));
  }

  render() {
    const { categories, products, productsOnCart, totalItems } = this.state;
    return (
      <>
        <TopNavBar cartSize={ totalItems } />
        <Switch>
          <Route
            path="/shoppingCart"
            render={ (props) => (<CartPage
              { ...props }
              productsOnCart={ productsOnCart }
              changeQtd={ this.changeQtd }
              totalItems={ totalItems }
            />) }
          />
          <Route
            path="/checkout"
            render={ (props) => (<Checkout
              { ...props }
              getFromLocalStorage={ this.getFromLocalStorage }
            />) }
          />
          <Route
            path="/:id"
            render={ (props) => <ProductDetails { ...props } addCart={ this.addCart } /> }
          />
          <Route
            path="/"
            render={ (props) => (<MainPage
              { ...props }
              categories={ categories }
              products={ products }
              onclick={ this.buscaDeProdutos }
              addCart={ this.addCart }
              onChange={ this.handleChange }
              onClickInput={ this.buscaProdutosInput }
            />) }
          />
        </Switch>
      </>
    );
  }
}
export default App;

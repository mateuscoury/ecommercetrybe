import React from 'react';
import PropTypes from 'prop-types';
import Stars from './Stars';
import Review from './Review';
import './ProductDetails.css';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.sub = this.sub.bind(this);
    this.clickedStars = this.clickedStars.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendReview = this.sendReview.bind(this);
    const { location: { state: {
      product: { available_quantity: availableQtd } } } } = props;
    this.state = {
      quantidade: 1,
      available: availableQtd,
      disable: false,
      aOc: [false, false, false, false, false],
      stars: 0,
      email: '',
      textArea: '',
      reviews: this.getReviews(),
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }));
  }

  getReviews() {
    let reviews = window.localStorage.getItem('reviews');
    if (reviews === null) {
      reviews = '[]';
    }
    return JSON.parse(reviews);
  }

  saveReviews(array = []) {
    window.localStorage.setItem('reviews', JSON.stringify(array));
  }

  add() {
    const { available, quantidade } = this.state;
    let newQtd = quantidade + 1;
    if (newQtd > available) {
      newQtd = available;
    }
    this.setState(() => ({ quantidade: newQtd, disable: false }));
  }

  sub() {
    const { quantidade } = this.state;
    let newQtd = quantidade - 1;
    if (newQtd <= 0) {
      newQtd = 0;
      this.setState(() => ({ disable: true }));
    }
    this.setState(() => ({ quantidade: newQtd }));
  }

  clickedStars(n = 0) {
    const newArray = [false, false, false, false, false];
    for (let i = 0; i < n; i += 1) {
      newArray[i] = true;
    }
    this.setState(() => ({ aOc: newArray, stars: n }));
  }

  sendReview() {
    const { location: { state: { product } } } = this.props;
    const { id } = product;
    const { email, stars, textArea } = this.state;
    const newReview = { id, email, stars, textArea };
    const reviews = this.getReviews();
    reviews.push(newReview);
    this.saveReviews(reviews);
    this.setState(() => ({ reviews }));
  }

  renderProductSession() {
    const { location: { state: { product } } } = this.props;
    const { addCart } = this.props;
    const { title, thumbnail, price, attributes,
      shipping: { free_shipping: freeShipping },
      available_quantity: availableQtd } = product;
    const { value_name: condicao } = attributes[1];
    const { quantidade, disable } = this.state;
    return (
      <div className="detailDiv">
        <div className="detailProduct">
          <div className="detailImg">
            <img src={ thumbnail } alt="item" />
          </div>
          <div className="detailText">
            <h3>Informações</h3>
            {freeShipping === true && <h1 data-testid="free-shipping">Free Shipping</h1>}
            <p className="detailPrice">{`R$ ${price}`}</p>
            <h1 data-testid="product-detail-name">{title}</h1>
            <p className="detailInfo">{`Quantidade disponivel: ${availableQtd}`}</p>
            <p className="detailInfo">{`Condição do Produto: ${condicao}`}</p>
            <div className="addAndSub">
              <button type="button" onClick={ this.sub }>-</button>
              <div>{quantidade}</div>
              <button type="button" onClick={ this.add }>+</button>
            </div>
            <p className="detailInfo">Quantidade</p>
            <button
              onClick={ () => addCart(product, quantidade) }
              disabled={ disable }
              className="addToCartButton"
              type="button"
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderReviewSession() {
    const { aOc, email, textArea } = this.state;
    return (
      <div className="detailReview">
        <p>Avaliações</p>
        <Stars clickedStars={ this.clickedStars } aOc={ aOc } />
        <form action="#">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
          />
          <textarea
            type="text"
            name="textArea"
            placeholder="Avaliação"
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
            value={ textArea }
          />
          <button
            className="submitBtn"
            type="button"
            onClick={ this.sendReview }
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }

  renderReviewList() {
    const { reviews } = this.state;
    const { location: { state: { product } } } = this.props;
    const { id: currentId } = product;
    const filteredReviews = reviews.filter(({ id }) => id === currentId);

    return (
      <div className="reviewList">
        { filteredReviews.map((review, index) => (<Review
          key={ index }
          review={ review }
        />))}
      </div>
    );
  }

  render() {
    return (
      <div className="detailDiv">
        {this.renderProductSession()}
        {this.renderReviewSession()}
        {this.renderReviewList()}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        attributes: PropTypes.arrayOf(PropTypes.any).isRequired,
        available_quantity: PropTypes.number.isRequired,
        value_name: PropTypes.string,
        shipping: PropTypes.shape({
          free_shipping: PropTypes.bool.isRequired,
        }),
      }).isRequired,
    }).isRequired,
  }).isRequired,
  addCart: PropTypes.func.isRequired,
};

export default ProductDetails;

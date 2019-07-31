import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import './product-list.css';

class ProductList extends Component {
  state = {
    productstoSort: this.props.products
  }

  componentDidMount() {
    this.props.getProductList();
  }

  sortProductList = (event) => {
    switch (event.target.value) {
      case 'Name':
        return this.setState({ productstoSort: this.props.products.sort((obj1, obj2) => (obj1.name > obj2.name) ? 1 : -1) });
      case 'Price':
        return this.setState({ productstoSort: this.props.products.sort((obj1, obj2) => obj1.price - obj2.price) });
      case 'Availability':
        return this.setState({ productstoSort: this.props.products.sort((obj1, obj2) => obj1.available - obj2.available) });
      default: return this.props.products
    }
  }

  renderDropdownList = () => {
    return <select className="select-css"
      onChange={(event) => this.sortProductList(event)}
      className='dropdownList'>
      <option value="Default">By default</option>
      <option value="Name">Name</option>
      <option value="Price">Price</option>
      <option value="Availability">Availability</option>
    </select>
  }

  renderProductList() {
    return this.props.products.map((i, index) => (
      <div className="product_list_item" key={index}>
        <p>{i.name}</p>
        <p>Price: {i.price}</p>
        <p>{i.available > 0 ? `In stock: ${i.available}` : 'Sold out'}</p>
        <button disabled={!i.available} className="add-to-cart-btn" onClick={() => this.props.addToCart(i)}>Add to card</button>
      </div>
    ));
  }

  render() {
    return (
      <div className="box-wrapper">
        {this.renderDropdownList()}
        <div className="App-product_list">
          {this.props.products ? this.renderProductList() : 'Product list is empty'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ products: state.products.products });
const mapDispatchToProps = dispatch => ({
  addToCart: (product) => dispatch(actionCreators.addToCart(product)),
  getProductList: () => dispatch(actionCreators.getProductList())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import './cart.css';

export class Cart extends Component {
  state = {
    totalSum: 0
  }

  componentDidMount() {
    return this.props.inCart.length !== 0 ? this.getTotalSum() : null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.totalSum === this.state.totalSum && prevProps.inCart !== this.props.inCart) {
      if (this.props.inCart.length === 0) {
        this.setState({ totalSum: 0 });
      } else {
        this.getTotalSum()
      }
    }
  }

  getTotalSum = () => {
    let tempSum = 0
    this.props.inCart.forEach(i => {
      tempSum = i.price * i.quantity + tempSum
    })
    this.setState({ totalSum: tempSum })
  }

  removeFromCart(product) {
    this.props.removeFromCart(product);
    setTimeout(() => {
      if (this.props.inCart.length === 0) {
        alert("You cleared your cart!");
      }
    }, 500);
  }

  renderCartList() {
    return <div>
      <div className="cart-wrapper">
        {this.props.inCart.map((product, index) => (
          <li className="collection-item" key="index">
            <div className="item-desc">
              <span className="title">{product.title}</span>
              <p>Name: {product.name}</p>
              <p>Price: {product.price}$</p>
              <p>Available: {product.available}</p>
              <p>Quantity:<input
                className='quantity'
                type='number'
                value={product.quantity}
                onChange={(event) => this.props.quantityChanged(event.target.value, index)}
              /></p>
              <div className="sum"> Sum: {product.quantity * product.price} </div>
              <button className="btn" onClick={() => { this.removeFromCart(product) }}>Remove</button>
            </div>
          </li>
        ))
        }
      </div>
      <div className="cartListControls">
        <button className="btn" onClick={this.props.clearCart}>Cancel Order</button>
        <button className="btn" onClick={() => {
          if (window.confirm(`Total price is: ${this.state.totalSum}$`)) {
            this.props.clearCart()
            alert("Have a nice day");
          };
        }}
        >
          Submit Order
      </button>
      </div>
    </div>
  }

  render() {
    return (
      <div className="container">
        <div className="cart">
          <h2>You have ordered:</h2>
          <ul className="collection">
            {this.props.inCart.length ? this.renderCartList() : (<p>Nothing.</p>)}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ inCart: state.cart.inCart });
const mapDispatchToProps = dispatch => ({
  quantityChanged: (quantity, index) => dispatch(actionCreators.quantityChanged(quantity, index)),
  removeFromCart: (product) => dispatch(actionCreators.removeFromCart(product)),
  clearCart: () => dispatch(actionCreators.clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
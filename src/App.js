import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Modal from './containers/modal/modal';
import Cart from './containers/cart/cart';
import ProductList from './containers/product-list/product-list';
import * as actionCreators from './actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeComponent: 'product-list' };
    this.changeNavigation = this.changeNavigation.bind(this);
  }

  changeNavigation(prop) {
    this.setState({ activeComponent: prop });
  }

  render() {
    return (
      <div className="App">
        <Modal />
        <header className="App-header">
          <div><Link to="/"><h1 className="App-title">My simple shop</h1></Link></div>
          <div className="header-wrapper">
            <nav className="App-sidebar-nav">
              <Link to="/">Product list</Link>
              <Link to="/cart">Cart</Link>
            </nav>
            <div className="add-product">
              <button onClick={this.props.toggleAddModal}>Add product</button>
              <Link to="/cart">
                <h2 className="App-title">
                  Cart {this.props.inCart.length}
                </h2>
              </Link>
            </div>
          </div>
        </header>
        <div className="App-wrapper">
          <Route exact path="/" component={ProductList} />
          <Route path="/cart" component={Cart} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ inCart: state.cart.inCart });
const mapDispatchToProps = dispatch => ({
  toggleAddModal: () => dispatch(actionCreators.toggleAddModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import './modal.css';

class Modal extends Component {
    state = {
        name: '',
        price: '',
        available: ''
    }

    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    addProduct = (e) => {
        e.preventDefault();
        this.props.addNewProduct(this.state);
        this.closeModal();
    }

    showDialog = () => {
        return !this.dialog.hasAttribute('open') ? this.dialog.showModal() : null
    }
    closeModal = () => {
        this.props.toggleAddModal();
        this.dialog.close();
    }

    renderDialog() {
        return <dialog ref={(ref) => this.dialog = ref}>
            <form onSubmit={this.addProduct}>
                <input
                    type='text'
                    name='name'
                    value={this.state.name}
                    placeholder='Name'
                    onChange={(event) => this.inputChangeHandler(event)} />
                <input
                    type='number'
                    name='price'
                    value={this.state.price}
                    placeholder='Price'
                    onChange={(event) => this.inputChangeHandler(event)} />
                <input
                    type='number'
                    name='available'
                    value={this.state.available}
                    placeholder='Quantity'
                    onChange={(event) => this.inputChangeHandler(event)} />
                <button type='submit'>Submit</button>
                <button onClick={this.props.toggleAddModal} type="button">Cancel</button>
            </form>
        </dialog>
    }

    render() {
        return (
            <div>
                {this.props.showAddModal ? this.showDialog() : null}
                <dialog ref={(ref) => this.dialog = ref}>
                    <form onSubmit={this.addProduct}>
                        <input
                            type='text'
                            name='name'
                            value={this.state.name}
                            placeholder='Name'
                            onChange={(event) => this.inputChangeHandler(event)} />
                        <input
                            type='number'
                            name='price'
                            value={this.state.price}
                            placeholder='Price'
                            onChange={(event) => this.inputChangeHandler(event)} />
                        <input
                            type='number'
                            name='available'
                            value={this.state.available}
                            placeholder='Quantity'
                            onChange={(event) => this.inputChangeHandler(event)} />
                        <button type='submit'>Submit</button>
                        <button onClick={this.closeModal} type="button">Cancel</button>
                    </form>
                </dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({ showAddModal: state.modal.showAddModal });
const mapDispatchToProps = dispatch => ({
    addNewProduct: (product) => dispatch(actionCreators.addNewProduct(product)),
    toggleAddModal: () => dispatch(actionCreators.toggleAddModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
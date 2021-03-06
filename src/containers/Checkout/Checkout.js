import React, { Component } from 'react';

import Checkout from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class CheckOut extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];

            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients: ingredients, totalPrice: price });
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();

    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');

    }


    render() {
        return (
            <div>
                <Checkout
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={() => (<ContactData
                        ingredients={this.props.ingredients}
                        price={this.state.totalPrice} />)} />
            </div>

        )
    }


}

export default CheckOut;
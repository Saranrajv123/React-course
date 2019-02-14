import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios.orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-app-burger-9be18.firebaseio.com/ingredients.json')
            .then((response) => {
                this.setState({ ingredients: response.data });
            })
            .catch((error) => {})
    }


    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(
            igkey => {
                return ingredients[igkey];
            }).reduce((sum, el) => {
                return sum + el;

            }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    purchasingClosedHandler = () => {
        this.setState({ purchasing: false });
    }

    purchansingContinueHandler = () => {
        // alert('Continue!');
        // this.setState({ loading: true });
        // const userData = {
        //     ingrediens: this.state.ingredients,
        //     totalPrice: this.state.totalPrice,
        //     customer: {
        //         name: 'saranraj',
        //         address: 'vanagaram',
        //         country: 'India'
        //     },
        //     email: 'saranraj@hello.com',
        //     delivaryType: 'fastest'
        // }
        // axios.post('/orders.json', userData)
        //     .then((response) => {
        //         this.setState({ loading: false, purchasing: true });
        //     })
        //     .catch((error) => {
        //         this.setState({ loading: false, purchasing: true })

        //     })

        const queryParam = [];
        for (let i in this.state.ingredients) {
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParam.push('price=' + this.state.totalPrice);
        const queryString = queryParam.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        
       

        let burger = this.state.error ? <p>ingredients didn't loading </p>: <Spinner />;

        if(this.state.ingredients) {
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchasingHandler}
                    purchasable={this.state.purchasable}
                />
            </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            purchaseClosed={this.purchasingClosedHandler}
            price={this.state.totalPrice}
            purchaseContinue={this.purchansingContinueHandler}
        />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />

        }

        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingClosedHandler}>
                    {orderSummary}

                </Modal>
                {burger}

            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
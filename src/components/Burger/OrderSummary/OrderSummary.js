import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('[OderSummary] is Update');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            igkey => {
                return(<li key={igkey}>
                <span>{igkey}</span> {this.props.ingredients[igkey]}
                </li>);
            }
        );
        return(
            <div>

            <h3>Your Order</h3>
            <p>Your Order Summary</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>CheckOut</p>
            <Button clicked={this.props.purchaseClosed} btnType="Danger">CANCEL</Button>
            <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>

        </div>
        );
    }
} 
export default OrderSummary;
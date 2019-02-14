import React from 'react';

import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Tasty food</h1>
            <div style={{width: '100%',margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>

            <Button 
                btnType='Danger'
                clicked={props.checkoutCancel}>Cancel</Button>
            <Button 
                btnType='Success'
                clicked={props.checkoutContinue}>SUCCESS</Button>

        </div>

    )


}

export default checkoutSummary;
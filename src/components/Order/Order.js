import React from 'react';
import classes from './Order.css';

const order = (props) => {
    // const ingredients = [];
    // for (let ingredientsName in props.ingredients) {
    //     ingredients.push({
    //         name: ingredientsName,
    //         amount: props.ingredients[ingredientsName]
    //     });

    // }

    // const ingredientOutput = ingredients.map((ig) => {
    //     return <span key={ig.name}>{ig.name} ({ig.amount})</span>;
    // });

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOuptut = ingredients.map((ingre) => {
    return (<span> {ingre.name} ({ingre.amount})</span>);
    });
    console.log(ingredientsOuptut);

    
    return(
        <div className={classes.Order}>
        <p>ingredients: {ingredientsOuptut} </p>
        <p>Price: <strong>USD: {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )
   
};


export default order;
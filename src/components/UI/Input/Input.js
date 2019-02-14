import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement = null;
    switch (props.Inputtype) {
        case 'input':
            inputElement = <input
                className={classes.InputType} {...props} />;
            break;
        case 'textarea':
            inputElement = <textarea
                className={classes.InputType} {...props} />;
            break;
        case 'email':
            inputElement = <input
                className={classes.InputType} {...props}/>;
            break;
        default:
            inputElement = <input {...props} />

    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}


        </div>
    );
}

export default input;
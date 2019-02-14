import React from 'react';

import classes from '../NavigationItems/NavigationItems.css';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';
import Orders from '../../../containers/Orders/Orders';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders" component={Orders}>Orders</NavigationItem>


    </ul>
);

export default navigationItems;
import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import classes from '../Layout/Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerShow: true
    }

    sideDrawerHandler = () => {
        this.setState({sideDrawerShow: false});
    }

    sideDrawerClickedHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerShow: !prevState.sideDrawerShow};
        });
    }
    render() {
        return(
        <Aux>
            <Toolbar drawerToogleClicked={this.sideDrawerClickedHandler}/>
            <SideDrawer 
                open={this.state.sideDrawerShow}
                closed={this.sideDrawerHandler}/>
            <main className={ classes.Content }>
                { this.props.children }
            </main>
        </Aux>

        ) 
    }
}

export default Layout;


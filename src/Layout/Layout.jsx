import React from 'react';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import classes from './Layout.module.scss';

class Layout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={classes.container}>
                <header>
                    <BurgerMenu />

                    <h1>Time Manager</h1>
                </header>
                <main>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Optio velit eum illum laborum quas eligendi officiis
                    quaerat. Laborum, aut. Voluptate repellendus qui illo
                    voluptatum similique, reiciendis repudiandae dolorem dolor?
                    Corporis.
                </main>
            </div>
        );
    }
}

export default Layout;

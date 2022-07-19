import { Fragment } from 'react'
import classes from './NavBar.module.css'

const NavBar = () => {
    return (
        <Fragment>
            <nav className={classes['Nav-bar']}>
                <h1>FAST <span>FOOD</span></h1>
            </nav>
        </Fragment>
    )
}

export default NavBar;

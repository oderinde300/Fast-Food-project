import React, { useContext } from 'react'
import { Fragment } from 'react';
import CartItem from './CartItem';
import classes from './Cart.module.css'
import CartItemTotal from './CartItemTotal';
import CartContext from '../../store/cart-context';
const Cart = (props) => {

    const cartCtx = useContext(CartContext);

    const totalAmount = +cartCtx.totalAmount;

    const amount = +cartCtx.amount;

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const cartItems = cartCtx.items.map(item => {
        return <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            amount={item.amount}
            image={item.image}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />
    })

    return (
        <Fragment>
            <div className={classes.cart}>
                <div >
                    <h1>My Order
                        <i className="fa-solid fa-cart-circle-check"></i>
                        <span>{numberOfCartItems}</span>
                    </h1>
                    <div className={classes['cart-items']}>
                        {cartItems}
                    </div>
                </div>
                <div className={classes['row-2']}>
                    <CartItemTotal
                        totalAmount={totalAmount}
                        amount={amount}
                    />
                </div>
                <button className={classes['cart-button']} onClick={props.onShowCheckout}>
                    Order and checkout
                </button>
            </div>
        </Fragment>
    )
}

export default Cart;

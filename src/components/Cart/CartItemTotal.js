import { useContext } from 'react';
import React from 'react'
import classes from './CartItemTotal.module.css'

import CartContext from '../../store/cart-context';

const CartItemTotal = (props) => {
    const cartCtx = useContext(CartContext)

    let subTotalAmount = props.totalAmount.toFixed(2)

    let deliveryFee = 10;

    let taxes = (props.totalAmount * 0.05).toFixed(2)

    let totalAmount = cartCtx.subTotalAmount.toFixed(2)

    return (
        <div className={classes['Cart-item-totals-container']}>
            <div className={classes['Cart-item-totals']}>
                <div className={classes['Cart-item-total']}>
                    <p>Sub total</p>
                    <p>{`$${subTotalAmount}`}</p>
                </div>
                <div className={classes['Cart-item-total']}>
                    <p>Delivery Fee</p>
                    <p>{`$${deliveryFee}`}</p>
                </div>
                <div className={classes['Cart-item-total']}>
                    <p>Taxes</p>
                    <p>{`$${taxes}`}</p>
                </div>
            </div>
            <div className={classes['total']}>
                <div className={classes['total-content']}>
                    <p>Total</p>
                    <p>{`$${totalAmount}`}</p>
                </div>
            </div>
        </div>
    )
}

export default CartItemTotal;

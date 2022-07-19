import React from 'react'
import classes from './CartItem.module.css'

const CartItem = (props) => {
    return (
        <div className={classes['cart-item']}>
            <div className={classes['top']}>
                <div className={classes['cart-img__container']}>
                    <img src={props.image} alt={props.name} />
                </div>
                <div className={classes['cart-item__content']}>
                    <p> {props.name}</p>
                    <div className={classes['cart-img__buttons']}>
                        <button onClick={props.onRemove}>-</button>
                        <span>{props.amount}</span>
                        <button onClick={props.onAdd}>+</button>
                    </div>
                </div>
            </div>
            <div>
                <p className={classes['cart-item__price']}>{`$${props.price}`}</p>
            </div>
        </div>
    )
}

export default CartItem;

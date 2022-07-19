import { useContext } from 'react'

import classes from './MealItem.module.css'
import CartContext from '../../../store/cart-context'
import MealItemForm from './MealItemForm'

// import bread1 from '../../../assets/bread1.jpg'

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);

    // const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            image: props.image,
            price: props.price,
            restaurant: props.restaurant
        })
    }
    return (
        <li className={classes['meal-item']}>
            <div className={classes['meal-item-img']}>
                <img src={`${props.image}`} alt={`${props.name}`} />
            </div>

            <div className={classes['meal-item-text']}>
                <div className={classes['meal-item-name']}>
                    <p >{props.restaurant}</p>
                    <p>{props.name}</p>
                </div>
                <div className={classes['meal-item-price']}>
                    <p>price :</p>
                    <p className={classes['price']}>{`$${props.price}`}</p>
                </div>
            </div>

            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li >
    )
}

export default MealItem;

import React, { useState, useRef } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
    const [formAmountIsValid, setFormAmountIsValid] = useState(true);
    const amountInputRef = useRef()

    // function that submits the form and add items to cart
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount

        if (enteredAmountNumber < 1
            ||
            enteredAmountNumber > 5
            ||
            enteredAmount.trim().length === 0) {
            setFormAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber)
    };

    return (
        <form className={classes['form']} onSubmit={submitHandler}>
            <div className={classes['form-item']}>
                <div>
                    <button>Add To Cart</button>
                </div>
                <div>
                    <Input
                        ref={amountInputRef}
                        // label='Amount'
                        input={{
                            id: 'amount_' + props.id,
                            type: 'number',
                            min: '1',
                            max: '5',
                            step: '1',
                            defaultValue: '1'
                        }} />
                    {!formAmountIsValid && <p>Please enter a valid amount (1-5).</p>}
                </div>
            </div>
        </form>
    )
}


export default MealItemForm;

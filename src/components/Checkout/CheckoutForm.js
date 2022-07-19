import { useState, useContext } from 'react';
import useInput from '../../hooks/use-input';
import classes from './CheckoutForm.module.css'
import CartContext from '../../store/cart-context';

const isNotEmpty = value => value.trim() !== '';
const isFiveChars = value => value.trim().length === 5;


const CheckoutForm = (props) => {
    const cartCtx = useContext(CartContext);

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: enteredNameIsInvalid,
        valueInputHandler: nameInputChange,
        inputBlurHandler: nameInputBlurHandler,
        reset: nameInputReset
    } = useInput(isNotEmpty)

    const {
        value: enteredStreet,
        isValid: enteredStreetIsValid,
        hasError: enteredStreetIsInvalid,
        valueInputHandler: streetInputChange,
        inputBlurHandler: streetInputBlurHandler,
        reset: streetInputReset
    } = useInput(isNotEmpty)

    const {
        value: enteredPostalCode,
        isValid: enteredPostalCodeIsValid,
        hasError: enteredPostalCodeIsInvalid,
        valueInputHandler: postalCodeInputChange,
        inputBlurHandler: postalCodeInputBlurHandler,
        reset: postalCodeInputReset
    } = useInput(isFiveChars)

    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: enteredCityIsInvalid,
        valueInputHandler: cityInputChange,
        inputBlurHandler: cityInputBlurHandler,
        reset: cityInputReset
    } = useInput(isNotEmpty)


    let formIsValid = false;

    if (enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsValid) {
        formIsValid = true
    }

    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }

        console.log('submitted')
        console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity)
        nameInputReset();
        cityInputReset();
        streetInputReset();
        postalCodeInputReset();

        const userData = {
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        }
        props.isSubmitting()
        try {
            await fetch('https://react-food-order-app-75bae-default-rtdb.firebaseio.com/orders.json', {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items,
                    orderId: props.orderId
                })
            })
        } catch (error) {
            props.isSubmitted(false);
            props.error('Order Failed')
            return;
        }

        props.isSubmitted()
        props.isChecked();
    }

    const nameControlClasses = `${classes.control} ${!enteredNameIsInvalid ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${!enteredStreetIsInvalid ? '' : classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${!enteredPostalCodeIsInvalid ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${!enteredCityIsInvalid ? '' : classes.invalid}`

    return (
        <form className={classes.form} onSubmit={formSubmissionHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name'
                    onChange={nameInputChange}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
                {enteredNameIsInvalid && <p>please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street'
                    onChange={streetInputChange}
                    onBlur={streetInputBlurHandler}
                    value={enteredStreet}
                />
                {enteredStreetIsInvalid && <p>please enter a valid street!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal'
                    onChange={postalCodeInputChange}
                    onBlur={postalCodeInputBlurHandler}
                    value={enteredPostalCode}
                />
                {enteredPostalCodeIsInvalid && <p>Please enter a valid postalCode (5 characters long)!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city'
                    onChange={cityInputChange}
                    onBlur={cityInputBlurHandler}
                    value={enteredCity}
                />
                {enteredCityIsInvalid && <p>please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} type='submit' disabled={!formIsValid}>Checkout</button>
            </div>
        </form>
    )
}

export default CheckoutForm;
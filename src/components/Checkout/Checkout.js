import React, { useContext, useState } from 'react'


import Modal from '../UI/Modal'
import checkmark from '../../assets/checkmark.svg.png'
import CheckoutForm from './CheckoutForm'
import classes from './Checkout.module.css'
import CartContext from '../../store/cart-context'
import spinner from '../../assets/spinner.svg'

const Checkout = (props) => {
    const [isCheckOut, setIsCheckout] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [httpError, setHttpError] = useState();

    const cartCtx = useContext(CartContext)

    const orderID = Math.random().toString()

    const checkoutMessage =
        <React.Fragment>
            <div className={classes['checkout']}>
                <div className={classes['checkout-order__message']}>
                    <h1>Your order has been received</h1>
                </div>
                <div className={classes['checkout-img']}>
                    <img src={checkmark} alt='ckeckmark' />
                </div>
                <div className={classes['checkout-purchase__message']}>
                    <h3>Thank you for your purchase!</h3>
                </div>
                <div className={classes['checkout-id']}>
                    <p>Your order ID is: {orderID}</p>
                </div>
                <div className={classes['checkout-confirmation__message']}>
                    <p>You will receive an order confirmaton email with the details of your order.</p>
                </div>
                <button onClick={props.onHideCheckout} className={classes['checkout-button']}>
                    Done
                </button>
            </div>
        </React.Fragment>

    const isChecked = () => {
        setIsCheckout(true);
    }

    const submitting = () => {
        setIsSubmitting(true);
    }

    const Submitted = () => {
        setIsSubmitting(false);
        cartCtx.clearCart();
    }

    const error = (errorMessage) => {
        setHttpError(errorMessage);
        console.log(errorMessage)
    }

    const checkoutForm =
        <React.Fragment>
            <div className={classes['checkout-total']}>
                <p>Total Amount:</p>
                <span>{`$${cartCtx.subTotalAmount.toFixed(2)}`}</span>
            </div>
            <CheckoutForm onCancel={props.onHideCheckout}
                isChecked={isChecked}
                isSubmitting={submitting}
                isSubmitted={Submitted}
                orderId={orderID}
                error={error}
            />
        </React.Fragment>

    const httpErrorDisplay = <section className={classes['error-container']}>
        <p className={classes.submmitError}>{httpError}</p>
        <button onClick={props.onHideCheckout} >
            Cancel
        </button>
    </section>


    return (
        <Modal onHideCheckout={props.onHideCheckout}>
            {!isCheckOut && !isSubmitting && !httpError && checkoutForm}
            {!isCheckOut && isSubmitting && <div className={classes.loading}><img src={spinner}
                alt='loading-spinner' />
            </div>}
            {isCheckOut && !isSubmitting && checkoutMessage}
            {!isCheckOut && !isSubmitting && httpError && httpErrorDisplay}

        </Modal>
    )
}

export default Checkout;

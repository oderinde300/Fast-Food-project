import { useReducer } from "react";
import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0,
    amount: 0,
    subTotalAmount: 0
};

const cartReducer = (state, action) => {
    //add logic for adding a cart item
    if (action.type === 'ADD') {
        const updatedAmount = action.item.amount;
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const updatedSubTotalAmount = updatedTotalAmount + 10 + (updatedTotalAmount * 0.05);

        // index of an item that exists already
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        //the item that exists already
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            //chaging the former item that exist to the new snap of the item
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            //updating the total items with an item that does not exist before
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            amount: updatedAmount,
            subTotalAmount: updatedSubTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        //the item that exists already
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        const updatedSubTotalAmount = updatedTotalAmount + 10 + (updatedTotalAmount * 0.05);

        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        if (action.type === 'CLEAR') {
            return defaultCartState;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            subTotalAmount: updatedSubTotalAmount
        }
    }

    return defaultCartState;
}

const CartProvider = (props) => {
    //const [state Snap Shot, function that allows you to dispatch action to the user] =
    // useReduecr(cartReducer, initial state)
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };

    const clearCart = () => {
        dispatchCartAction({ type: 'CLEAR' })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        amount: cartState.amount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart,
        subTotalAmount: cartState.subTotalAmount
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;


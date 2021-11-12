import React, { useReducer } from 'react'
import CardContext from './CartContext'

const defaultCartState = {
    items:[],
    totalAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        const updateditems = state.items.concat(action.item)
        const updatedTotalAmount = state.totalAmount + action.item.amount;
        return {
            items: updateditems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id})
    }


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler 
    }

    return (
        <CardContext.Provider value={cartContext}>
            {props.children}
        </CardContext.Provider>
    )
}

export default CartProvider

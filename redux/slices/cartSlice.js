import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        totalQuantity: 0,
        showCart: false,
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    totalPrice: newItem.price,
                    quantity: 1,
                });
            }
            state.total += newItem.price;
            state.totalQuantity++;
        },
        removeFromCart(state, action) {
            const productId = action.payload;
        
            // Find the existing item in the cart
            const existingItem = state.items.find(item => item.id === productId);
            
            // Check if the item exists in the cart
            if (!existingItem) {
                return;
            }
            // If quantity is 1, remove the item from the cart
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== productId);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            
            state.totalQuantity--;
        },
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
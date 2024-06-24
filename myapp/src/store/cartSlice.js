import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('cart');
        return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
        console.warn('Could not load state', e);
        return [];
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('cart', serializedState);
    } catch (e) {
        console.warn('Could not save state', e);
    }
};
const initialState=loadState();
const CartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        add(state,action){
            state.push(action.payload)
            saveState(state)

        },
        remove(state,action){
            const newState= state.filter((item)=>item._id!== action.payload);
            saveState(newState);
            return newState;
        },
        clearCart(state){
            const newState=[];
            saveState(newState)
            sessionStorage.removeItem('cart')
            return newState;
        },
        setItems(state, action) {
            const newState= action.payload;
            saveState(newState)
            return newState;
        }
    }

})


export const {add,remove,clearCart,setItems} =CartSlice.actions;
export default CartSlice.reducer
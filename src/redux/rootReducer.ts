import { baseApi } from "./api/baseApi";
import selectReducer from './features/varientOption/selectSlice';
import cartReducer from './features/cart/cartSlice';
import checkoutReducer from './features/checkout/checkoutSlice';

export const reducer = {
    cart: cartReducer,
    select: selectReducer,
    checkout: checkoutReducer,
    [baseApi.reducerPath]: baseApi.reducer
}


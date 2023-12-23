import { baseApi } from "./api/baseApi";
import selectReducer from './features/varientOption/selectSlice';
import cartReducer from './features/cart/cartSlice';

export const reducer = {
    cart: cartReducer,
    select: selectReducer,
    [baseApi.reducerPath]: baseApi.reducer
}


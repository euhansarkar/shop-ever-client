import { baseApi } from "./api/baseApi";
import { radioSlice } from "./features/radio/radioSlice";

export const reducer = {
    radio: radioSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer
}


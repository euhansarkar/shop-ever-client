import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from "lodash";

interface CheckoutState {
}

const initialState: CheckoutState = {

};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addCheckoutData: (state, action: PayloadAction<CheckoutState>) => {

      const newData = _.cloneDeep(action?.payload);

      state = { ...state, ...newData };

      return state;

    },
  },
});

export const { addCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;

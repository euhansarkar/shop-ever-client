import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutState {
  // shippingAddr: {
  //   name: string;
  //   country: string;
  //   state: string;
  //   city: string;
  //   phone_number_1: string;
  //   phone_number_2: string;
  //   location: string;
  // };
  // shippingMethod: {
  //   name: string;
  // };
  // billingAddr: {
  //   name: string;
  //   country: string;
  //   state: string;
  //   city: string;
  //   phone_number_1: string;
  //   phone_number_2: string;
  //   location: string;
  // };
  // paymentMethod: {
  //   name: string;
  // };
}

export const initialCheckoutState: CheckoutState = {
  // shippingAddr: {
  //   name: '',
  //   country: '',
  //   state: '',
  //   city: '',
  //   phone_number_1: '',
  //   phone_number_2: '',
  //   location: '',
  // },
  // shippingMethod: {
  //   name: '',
  // },
  // billingAddr: {
  //   name: '',
  //   country: '',
  //   state: '',
  //   city: '',
  //   phone_number_1: '',
  //   phone_number_2: '',
  //   location: '',
  // },
  // paymentMethod: {
  //   name: '',
  // },
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialCheckoutState,
  reducers: {
    addCheckoutData: (state, action: PayloadAction<CheckoutState>) => {
      return {
        ...state, ...action.payload
      }
    },
  },
});

export const { addCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;

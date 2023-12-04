import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRadio {
    value: string | undefined;
}

const initialState: IRadio = {
    value: undefined
};

export const radioSlice = createSlice({
    name: 'radio',
    initialState,
    reducers: {
        setAttributeType: (state, action: PayloadAction<IRadio>) => {
            state.value = action.payload.value;
        },
    },
});

export const { setAttributeType } = radioSlice.actions;


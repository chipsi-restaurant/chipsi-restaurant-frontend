import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
    label: string;
    lat: number;
    lng: number;
}

interface AddressState {
    list: Address[];
    selected: Address | null;
}

const initialState: AddressState = {
    list: [],
    selected: null,
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        addAddress: (state, action: PayloadAction<Address>) => {
            state.list.push(action.payload);
            state.selected = action.payload;
        },
        deleteAddress: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(addr => addr.label !== action.payload);
            if (state.selected?.label === action.payload) {
                state.selected = state.list[0] || null;
            }
        },
        selectAddress: (state, action: PayloadAction<string>) => {
            const found = state.list.find(addr => addr.label === action.payload);
            if (found) state.selected = found;
        },
        replace: (state, action: PayloadAction<AddressState>) => {
            return action.payload;
        }
    },
});

export const { addAddress, deleteAddress, selectAddress, replace } = addressSlice.actions;
export default addressSlice.reducer;

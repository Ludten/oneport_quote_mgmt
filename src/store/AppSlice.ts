import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppType } from "../type/AppType";

const initial: AppType = {
    value: false
};

const Appslice = createSlice({
    name: 'App',
    initialState: initial,
    reducers: {
      setBool: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload
      },
      setToggle: state => {
        state.value = !state.value
      },
    },
});

export const {
    setBool,
    setToggle,
} = Appslice.actions;
  
export default Appslice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppType } from "../../types/AppType";
import type { QuoteType } from "../../types/QuoteType";

const initialState: AppType = {
    quotes: [],
    loading: false,
    error: null,
};

const Appslice = createSlice({
    name: 'App',
    initialState,
    reducers: {
      fetchQuotesStart(state, _action: PayloadAction<{ startDate: string; endDate: string }>) { // eslint-disable-line @typescript-eslint/no-unused-vars
        state.loading = true;
        state.error = null;
      },
      fetchQuotesSuccess(state, action: PayloadAction<QuoteType[]>) {
        state.loading = false;
        state.quotes = action.payload;
      },
      fetchQuotesFailure(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
      },
    },
});

export const {
  fetchQuotesStart, 
  fetchQuotesSuccess, 
  fetchQuotesFailure
} = Appslice.actions;
  
export default Appslice.reducer;

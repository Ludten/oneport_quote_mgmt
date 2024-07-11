import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { QuoteSliceType } from "../../types/AppType";
import type { NewQuoteType, QuoteType } from "../../types/QuoteType";

const initialState: QuoteSliceType = {
  quote: null,
  loading: false,
  error: null,
};

const QuoteSlice = createSlice({
  name: "Quote",
  initialState,
  reducers: {
    fetchQuoteStart(state, _action: PayloadAction<{ id: string }>) {
      // eslint-disable-line @typescript-eslint/no-unused-vars
      state.loading = true;
      state.error = null;
    },
    fetchQuoteSuccess(state, action: PayloadAction<QuoteType>) {
      state.loading = false;
      state.quote = action.payload;
    },
    fetchQuoteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editQuoteStart(
      state,
      _action: PayloadAction<{
        // eslint-disable-line @typescript-eslint/no-unused-vars
        id: string;
        updatedQuote: NewQuoteType;
        date: Date;
      }>,
    ) {
      state.loading = true;
      state.error = null;
    },
    editQuoteSuccess(state) {
      state.loading = false;
    },
    editQuoteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createQuoteStart(
      state,
      _action: PayloadAction<{ newQuote: NewQuoteType; date: Date }>, // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
      state.loading = true;
      state.error = null;
    },
    createQuoteSuccess(state) {
      state.loading = false;
    },
    createQuoteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuoteStart,
  fetchQuoteSuccess,
  fetchQuoteFailure,
  editQuoteStart,
  editQuoteSuccess,
  editQuoteFailure,
  createQuoteStart,
  createQuoteSuccess,
  createQuoteFailure,
} = QuoteSlice.actions;

export default QuoteSlice.reducer;

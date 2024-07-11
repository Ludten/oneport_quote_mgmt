import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DraftQuotesSliceType } from "../../types/AppType";
import type { NewQuoteType } from "../../types/QuoteType";
import type { RootState } from "../rootStore";

const initialState: DraftQuotesSliceType = {
  quotes: [],
};

const draftQuotesSlice = createSlice({
  name: "draftQuotes",
  initialState,
  reducers: {
    addDraftQuote: (state, action: PayloadAction<NewQuoteType>) => {
      state.quotes.push(action.payload);
    },
    updateDraftQuote: (state, action: PayloadAction<NewQuoteType>) => {
      const index = state.quotes.findIndex(
        (quote) => quote.id === action.payload.id,
      );
      if (index !== -1) {
        state.quotes[index] = action.payload;
      }
    },
    removeDraftQuote: (state, action: PayloadAction<string>) => {
      state.quotes = state.quotes.filter(
        (draft) => draft.id !== action.payload,
      );
    },
    clearDraftQuotes: (state) => {
      state.quotes = [];
    },
  },
});

export const selectQuoteById = (state: RootState, quoteId: string) => {
  return state.draftQuotesSlice.quotes.find((quote) => quote.id === quoteId);
};

export const {
  addDraftQuote,
  updateDraftQuote,
  removeDraftQuote,
  clearDraftQuotes,
} = draftQuotesSlice.actions;

export default draftQuotesSlice.reducer;

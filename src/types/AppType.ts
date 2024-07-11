import type { NewQuoteType, QuoteType } from "./QuoteType";

interface AppType {
  quotes: QuoteType[];
  loading: boolean;
  error: string | null;
}

interface QuoteSliceType {
  quote: QuoteType | null;
  loading: boolean;
  error: string | null;
}

interface DraftQuotesSliceType {
  quotes: NewQuoteType[];
}

interface CurrencyOption {
  value: string;
  flagCode: string;
  prefix: string;
}

export type { AppType, QuoteSliceType, DraftQuotesSliceType, CurrencyOption };

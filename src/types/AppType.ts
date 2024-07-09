import type { QuoteType } from "./QuoteType";

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

export type { AppType, QuoteSliceType }

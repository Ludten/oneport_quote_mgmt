import type { QuoteType } from "./QuoteType";

interface QuoteResponse {
  status: string;
  data: QuoteType | null;
  message: string;
  code: number;
}

interface QuotesResponse {
  status: string;
  data: QuoteType[];
  message: string;
  code: number;
}

export type { QuoteResponse, QuotesResponse };

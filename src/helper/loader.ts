import { apiEndpoint } from "../config";
import type { QuoteResponse, QuotesResponse } from "../types/ResponseType";

export const getQuotes = async (startDate: string, endDate: string) => {
  const uri = `${apiEndpoint}/get?start_date=${startDate}&end_date=${endDate}`;

  let ret: QuotesResponse = {
    status: "",
    data: [],
    message: "",
    code: 0,
  };

  try {
    const res = await fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
    });

    const data = (await res.json()) as QuotesResponse;
    ret = data;
  } catch (error) {
    console.error(error);
    throw error;
  }

  return ret;
};

export const getQuote = async (id: string) => {
  const uri = `${apiEndpoint}/get_single_quote/${id}`;

  let ret: QuoteResponse = {
    status: "",
    data: null,
    message: "",
    code: 0,
  };

  try {
    const res = await fetch(uri, {
      method: "GET",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
    });

    const data = (await res.json()) as QuoteResponse;
    ret = data;
  } catch (error) {
    console.error(error);
    throw error;
  }

  return ret;
};

import { apiEndpoint } from "../config";
import { NewQuoteType, RequestQuoteType } from "../types/QuoteType";
import type { QuoteResponse } from "../types/ResponseType";

export const createQuote = async (newQuote: NewQuoteType) => {
  const uri = `${apiEndpoint}/create`;

  let ret: QuoteResponse = {
    status: "",
    data: null,
    message: "",
    code: 0,
  };

  const reqQuote: RequestQuoteType = { ...newQuote };

  if ("id" in reqQuote) delete reqQuote["id"];
  if ("endTime" in reqQuote) delete reqQuote["endTime"];

  try {
    const res = await fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqQuote),
    });

    const data = (await res.json()) as QuoteResponse;
    ret = data;
  } catch (error) {
    console.error(error);
    throw error;
  }

  return ret;
};

export const editQuote = async (id: string, updatedQuote: NewQuoteType) => {
  const uri = `${apiEndpoint}/edit/${id}`;

  let ret: QuoteResponse = {
    status: "",
    data: null,
    message: "",
    code: 0,
  };

  const reqQuote: RequestQuoteType = { ...updatedQuote };

  if ("id" in reqQuote) delete reqQuote["id"];
  if ("endTime" in reqQuote) delete reqQuote["endTime"];

  try {
    const res = await fetch(uri, {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqQuote),
    });

    const data = (await res.json()) as QuoteResponse;
    ret = data;
  } catch (error) {
    console.error(error);
    throw error;
  }

  return ret;
};

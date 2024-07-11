import { type Middleware } from "redux";
import type {
  AppType,
  QuoteSliceType,
  DraftQuotesSliceType,
} from "../types/AppType";

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("state", JSON.stringify(getState()));
    return result;
  };
};

const loadState = ():
  | {
      AppSlice: AppType;
      QuoteSlice: QuoteSliceType;
      draftQuotesSlice: DraftQuotesSliceType;
    }
  | undefined => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (appstore: {
  AppSlice: AppType;
  QuoteSlice: QuoteSliceType;
  draftQuotesSlice: DraftQuotesSliceType;
}) => {
  try {
    const serializedState = JSON.stringify(appstore);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error("Error saving state to local storage:", error);
  }
};

export { localStorageMiddleware, loadState, saveState };

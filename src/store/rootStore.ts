import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import AppSlice from "./slice/AppSlice";
import QuoteSlice from "./slice/QuoteSlice";
import rootSaga from "./sagas/rootSaga";
import draftQuotesSlice from "./slice/draftQuotesSlice";
import { loadState, saveState } from "./localStorage";

const sagaMiddleware = createSagaMiddleware();

const persistedState = loadState();

const store = configureStore({
  reducer: {
    AppSlice,
    QuoteSlice,
    draftQuotesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

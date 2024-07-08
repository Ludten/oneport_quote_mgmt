import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import AppSlice from "./slice/AppSlice";
import QuoteSlice from "./slice/QuoteSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    AppSlice,
    QuoteSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

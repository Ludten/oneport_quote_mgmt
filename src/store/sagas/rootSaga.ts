import { all } from 'redux-saga/effects';
import { watchFetchQuotes } from './quotesSaga';
import { watchFetchQuote, watchEditQuote, watchCreateQuote } from './quoteSaga';

export default function* rootSaga() {
  yield all([
    watchFetchQuotes(),
    watchFetchQuote(),
    watchEditQuote(),
    watchCreateQuote()
  ]);
}

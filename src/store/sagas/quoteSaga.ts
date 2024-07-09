import { takeLatest, call, put } from 'redux-saga/effects';
import { getQuote } from '../../helper/loader';
import { createQuoteFailure, createQuoteStart, createQuoteSuccess, 
  editQuoteFailure, editQuoteStart, editQuoteSuccess, fetchQuoteFailure, 
  fetchQuoteStart, fetchQuoteSuccess } from '../slice/QuoteSlice';
import type { QuoteResponse } from '../../types/ResponseType';
import { startEndDates } from '../../helper/utils';
import { fetchQuotesStart } from '../slice/AppSlice';
import { createQuote, editQuote } from '../../helper/serverops';

function* fetchQuoteSaga(action: ReturnType<typeof fetchQuoteStart>) {
  try {
    const { id } = action.payload;
    const quoteResp: QuoteResponse = yield call(getQuote, id );
    if (quoteResp.data) {
      yield put(fetchQuoteSuccess(quoteResp.data));
    } else {
      throw new Error("Error fetching quote");      
    }
  } catch (err) {
    const error = err as Error;
    yield put(fetchQuoteFailure(error.message));
  }
}

function* editQuoteSaga(action: ReturnType<typeof editQuoteStart>) {
  try {
    const { id, updatedQuote, date } = action.payload;
    yield call(editQuote, id, updatedQuote);
    yield put(editQuoteSuccess());

    yield put(fetchQuotesStart(startEndDates(date)));
  } catch (err) {
    const error = err as Error;
    yield put(editQuoteFailure(error.message));
  }
}

function* createQuoteSaga(action: ReturnType<typeof createQuoteStart>) {
  try {
    const { newQuote, date } = action.payload;
    yield call(createQuote, newQuote);
    yield put(createQuoteSuccess());

    yield put(fetchQuotesStart(startEndDates(date)));
  } catch (err) {
    const error = err as Error;
    yield put(createQuoteFailure(error.message));
  }
}

export function* watchFetchQuote() {
  yield takeLatest(fetchQuoteStart.type, fetchQuoteSaga);
}

export function* watchEditQuote() {
  yield takeLatest(editQuoteStart.type, editQuoteSaga);
}

export function* watchCreateQuote() {
  yield takeLatest(createQuoteStart.type, createQuoteSaga);
}

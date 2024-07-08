import { takeLatest, call, put } from 'redux-saga/effects';
import { getQuotes } from '../../helper/loader';
import { fetchQuotesStart, fetchQuotesSuccess, fetchQuotesFailure } from '../slice/AppSlice';
import type { QuotesResponse } from '../../types/ResponseType';

function* fetchQuotesSaga(action: ReturnType<typeof fetchQuotesStart>) {
  try {
    const { startDate, endDate } = action.payload;
    const quotesResp: QuotesResponse = yield call(getQuotes, startDate, endDate);
    yield put(fetchQuotesSuccess(quotesResp.data));
  } catch (err) {
    const error = err as Error;
    yield put(fetchQuotesFailure(error.message));
  }
}

export function* watchFetchQuotes() {
  yield takeLatest(fetchQuotesStart.type, fetchQuotesSaga);
}

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { setBool } from './AppSlice';

function* trueValueSaga() {
  yield put(setBool(true));
}

function* watchAppSaga() {
  yield takeEvery('app/trueSaga', trueValueSaga);
}

export default function* rootSaga() {
  yield all([
    call(watchAppSaga),
    
  ]);
}

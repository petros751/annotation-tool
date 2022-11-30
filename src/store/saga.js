import { all, fork } from 'redux-saga/effects';
import { watchImagesSaga } from './imagesSagas';

export default function* rootSaga() {
  yield all([
    // more sagas from different files
    watchImagesSaga,
  ].map(fork));
}

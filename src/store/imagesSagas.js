import { takeLatest, put } from 'redux-saga/effects';
import { updateImagesList, addImages } from './imagesSlice';

function* addImagesSagas(action) {
  try {
      yield put(updateImagesList(action.payload));
  } catch (err) {
    console.error('New error', err);
  }
}



export function* watchImagesSaga() {
    yield takeLatest(addImages.type, addImagesSagas);
}
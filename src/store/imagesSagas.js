import { takeLatest, put } from 'redux-saga/effects';
import { updateImagesList, addImages } from './imagesSlice';

function* addImagesSagas(action) {
  try {
    console.log(action);
    console.log(action.payload);
      yield put(updateImagesList(action.payload));
  } catch (err) {
    console.error('New error', err);
  }
}



export function* watchImagesSaga() {
    yield takeLatest(addImages.type, addImagesSagas);
}
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import imagesReducer from './imagesSlice';
import rootSaga from './saga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store middlewares array, to include saga middleware
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

const devMode = 'development';

if (devMode) {
  // If in devMode, add redux logging
  middleware.push(logger);
}

// Include all reducers to store
const reducer = combineReducers({
    images: imagesReducer,
});

export const store = configureStore({
  reducer,
  devTools: devMode,
  middleware,
});

// Start sagas
sagaMiddleware.run(rootSaga);

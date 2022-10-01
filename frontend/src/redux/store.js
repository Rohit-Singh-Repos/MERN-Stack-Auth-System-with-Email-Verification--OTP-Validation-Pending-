import logger from 'redux-logger';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import userTokenSlice from './commonReducers/authSlice';
import userInfoSlice from './commonReducers/userInfoSlice';
import {
  changeUserPasswordServices,
  getLoggedInUserServices,
  loginUserServices,
  registerUserServices,
  resetPasswordServices,
  sendPasswordResetEmailServices,
} from './commonServices/common.services';

const persistConfig = {
  key:"root1",
  storage:storage
}
const persistConfig2 = {
  key:"root2",
  storage:storage
}

const rootReducer = combineReducers({
  userInfo:persistReducer(persistConfig,userInfoSlice),
  userToken:persistReducer(persistConfig2,userTokenSlice)
})

export const reduxStore = configureStore({
  reducer: {
    commonReducer:rootReducer,
    userInfo:userInfoSlice,
    userToken:userTokenSlice,
    [registerUserServices.reducerPath]: registerUserServices.reducer,
    [loginUserServices.reducerPath]: loginUserServices.reducer,
    [getLoggedInUserServices.reducerPath]: getLoggedInUserServices.reducer,
    [sendPasswordResetEmailServices.reducerPath]:sendPasswordResetEmailServices.reducer,
    [resetPasswordServices.reducerPath]:resetPasswordServices.reducer,
    [changeUserPasswordServices.reducerPath]:changeUserPasswordServices.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false
    }).concat(
      logger,
      registerUserServices.middleware,
      loginUserServices.middleware,
      getLoggedInUserServices.middleware,
      sendPasswordResetEmailServices.middleware,
      resetPasswordServices.middleware,
      changeUserPasswordServices.middleware
    ),
});

export const persistor = persistStore(reduxStore);

setupListeners(reduxStore.dispatch);

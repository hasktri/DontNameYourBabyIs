
import { configureStore } from '@reduxjs/toolkit';

import listReducer from './features/list/listSlice';
import userReducer from './features/user/userSlice';
import settingReducer from './features/setting/settingSlice';
import { nameApi } from './features/name/nameApiSlice';




// Real-world logger middleware: logs every action's type and payload
const loggerMiddleware = storeAPI => next => action => {
  console.log('Dispatching action:', action.type, 'Payload:', action.payload);
  return next(action);
};

const store = configureStore({
  reducer: {
    list: listReducer,
    user: userReducer,
    setting: settingReducer,
    [nameApi.reducerPath]: nameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nameApi.middleware, loggerMiddleware),
});

export default store;

import {configureStore} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducer';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const persistedReducer = persistReducer(
  {
    key: '@contactsKey',
    storage: AsyncStorage,
    stateReconciler: hardSet,
  },
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    ];
  },
  devTools: true,
});

const persistor = persistStore(store);
export {store, persistor};

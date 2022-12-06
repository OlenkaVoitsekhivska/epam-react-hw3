import { configureStore } from '@reduxjs/toolkit';

import { authorsReducer } from './authors/slice';
import { coursesReducer } from './courses/slice';
import { userReducer } from './user/slice';
import { devToolsEnhancer } from '@redux-devtools/extension';
import storage from 'redux-persist/lib/storage';
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
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReeducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
	courses: coursesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReeducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
// export const store = configureStore({
//   reducer: {
//     user:userReducer,
//     authors:authorsReducer,
//     courses:coursesReducer
//   },
// });

export const persistor = persistStore(store);

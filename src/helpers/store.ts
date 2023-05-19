import { configureStore, ThunkAction, Action, applyMiddleware } from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import api from '../middleware/api.middleware.js';
import accountReducer from '../reducers/account.reducer.js';
import appReducer from '../reducers/app.reducer.js';
import messagesReducer from '../reducers/messages.reducer.js';

const logger = createLogger();

export const store = configureStore({
  reducer: {
    account: accountReducer,
    app: appReducer,
    messages: messagesReducer
  },
  middleware: [api, logger]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

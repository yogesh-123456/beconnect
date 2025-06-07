import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice1 from "./authSlice1";
import postSlice1 from "./postSlice1"
import socketSlice1 from "./socketSlice1"
import chatSlice1 from "./chatSlice1"
import rtnSlice1 from "./rtnSlice1"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
    auth1:authSlice1,
    post1:postSlice1,
    socketio1:socketSlice1,
    chat1:chatSlice1,
    realTimeNotification1:rtnSlice1
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const newstore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default newstore;

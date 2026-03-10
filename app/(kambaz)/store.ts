import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/reducer';
import modulesReducer from './courses/[cid]/modules/reducer';
import accountsReducer from './account/reducer';

const store = configureStore({
  reducer: { coursesReducer, modulesReducer, accountsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

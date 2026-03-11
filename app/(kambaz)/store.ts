import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/reducer';
import modulesReducer from './courses/[cid]/modules/reducer';
import assignmentsReducer from './courses/[cid]/assignments/reducer';
import accountsReducer from './account/reducer';

const store = configureStore({
  reducer: { coursesReducer, modulesReducer, assignmentsReducer, accountsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

import { configureStore } from '@reduxjs/toolkit';
import testSliceReducer from './testSlice';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer
});

export default store;
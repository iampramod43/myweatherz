import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../features/locationSlice';
import cityReducer from '../features/citySlice';
export default configureStore({
  reducer: {
    location: locationReducer,
    city: cityReducer,
  },
});

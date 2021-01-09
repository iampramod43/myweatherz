import { createSlice } from '@reduxjs/toolkit';

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    city: 'Search City'
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;


export const selectCity = state => state.city.city;

export default citySlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Votre état initial ici
  data: [],
  loading: false,
  error: null
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  },
//   extraReducers: (builder) => {
//     builder.addCase(machin.pending, (state) => {
//         state.fetchstatus = 'loading'
//     })
//   }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = testSlice.actions;
export default testSlice.reducer;
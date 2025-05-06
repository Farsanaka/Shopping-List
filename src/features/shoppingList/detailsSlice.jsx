import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  showDetailsModal: false,
  selectedItem: null,
};
 
const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    openDetails: (state, action) => {
      state.showDetailsModal = true;
      state.selectedItem = action.payload;
    },
    closeDetails: (state) => {
      state.showDetailsModal = false;
      state.selectedItem = null;
    },
  },
});
 
export const { openDetails, closeDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
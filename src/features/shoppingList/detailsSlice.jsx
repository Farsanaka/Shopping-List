<<<<<<< HEAD
// details slice for getting items in list page while clicking "details"
import { createSlice } from "@reduxjs/toolkit";

=======
import { createSlice } from "@reduxjs/toolkit";
 
>>>>>>> 22db0f6ad79eca1f269efb2a7661645df6c8d207
const initialState = {
  showDetailsModal: false,
  selectedItem: null,
};
<<<<<<< HEAD

=======
 
>>>>>>> 22db0f6ad79eca1f269efb2a7661645df6c8d207
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
<<<<<<< HEAD

export const { openDetails, closeDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
=======
 
export const { openDetails, closeDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
>>>>>>> 22db0f6ad79eca1f269efb2a7661645df6c8d207

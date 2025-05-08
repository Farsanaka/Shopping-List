// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   showDetailsModal: false,
//   selectedItem: null,
//   checkedItems: {}, // Persisted checked state (after save)
// };

// const detailsSlice = createSlice({
//   name: "details",
//   initialState,
//   reducers: {
//     openDetails: (state, action) => {
//       state.showDetailsModal = true;
//       state.selectedItem = action.payload;

//       // const listId = action.payload.id;
//       // if (!state.checkedItems[listId]) {
//       //
//       const stored = JSON.parse(localStorage.getItem("checkedItems")) || {};
//       if (stored[listId]) {
//         state.checkedItems[listId] = stored[listId];
//       } else {
//         //
//         const newChecked = {};
//         action.payload.items?.forEach((_, idx) => {
//           newChecked[idx] = false;
//         });
//         state.checkedItems[listId] = newChecked;
//       }
//     },

//     // Only update Redux state when Save is clicked
//     saveCheckedItems: (state, action) => {
//       const { listId, checkedState } = action.payload;
//       state.checkedItems[listId] = checkedState;

//       // Also update the status of the selected item
//       const allChecked = Object.values(checkedState).every(Boolean);
//       if (state.selectedItem?.id === listId) {
//         state.selectedItem.status = allChecked ? "Completed" : "Pending";
//       }
//       //
//       const currentChecked = state.checkedItems[listId];
//       if (currentChecked) {
//         const saved = JSON.parse(localStorage.getItem("checkedItems")) || {};
//         saved[listId] = currentChecked;
//         localStorage.setItem("checkedItems", JSON.stringify(saved));
//       }
//       //
//     },

//     closeDetails: (state) => {
//       state.showDetailsModal = false;
//       state.selectedItem = null;
//     },
//   },
// });

// export const { openDetails, closeDetails, saveCheckedItems, toggleItemCheck } =
//   detailsSlice.actions;
// export default detailsSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDetailsModal: false,
  selectedItem: null,
  checkedItems: {}, // Persisted checked state (after save)
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    openDetails: (state, action) => {
      state.showDetailsModal = true;
      state.selectedItem = action.payload;

      const listId = action.payload.id; 
      const stored = JSON.parse(localStorage.getItem("checkedItems")) || {};

      if (stored[listId]) {
        state.checkedItems[listId] = stored[listId];
      } else {
        const newChecked = {};
        action.payload.items?.forEach((_, idx) => {
          newChecked[idx] = false;
        });
        state.checkedItems[listId] = newChecked;
      }
    },

    // Only update Redux state when Save is clicked
    saveCheckedItems: (state, action) => {
      const { listId, checkedState } = action.payload;
      state.checkedItems[listId] = checkedState;

      // Also update the status of the selected item
      const allChecked = Object.values(checkedState).every(Boolean);
      if (state.selectedItem?.id === listId) {
        state.selectedItem.status = allChecked ? "Completed" : "Pending";
      }

      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem("checkedItems")) || {};
      saved[listId] = checkedState;
      localStorage.setItem("checkedItems", JSON.stringify(saved));
    },

    closeDetails: (state) => {
      state.showDetailsModal = false;
      state.selectedItem = null;
    },
  },
});

export const { openDetails, closeDetails, saveCheckedItems } = detailsSlice.actions;
export default detailsSlice.reducer;

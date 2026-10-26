import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";

const initialCustomerState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return { fullName, nationalID, createdAt: new Date().toISOString() };
      },
      reducer(state, action) {
        this.state = action.payload;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
    updateNationalID(state, action) {
      state.nationalID = action.payload;
    },
  },
});

export default customerSlice.reducer;

export const { createCustomer, updateName, updateNationalID } =
  customerSlice.actions;

// export default function customerReducer(state = initialCustomerState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };

//     case "customer/updateNationalID":
//       return { ...state, nationalID: action.payload };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }

// export function updateNationalID(id) {
//   return {
//     type: "customer/updateNationalID",
//     payload: id,
//   };
// }
// export function updateName(fullName) {
//   return {
//     type: "customer/updateName",
//     payload: fullName,
//   };
// }

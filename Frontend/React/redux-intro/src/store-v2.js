import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// import { thunk } from "redux-thunk";

// const initialState = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
// };

// function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload };
//     case "account/widthdraw":
//       return { ...state, balance: state.balance - action.payload };

//     case "accont/requestLoan":
//       if (state.loan > 0) {
//         return state;
//       }

//       return { ...state, loan: action.payload.purpose };

//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//         loanPurpose: "",
//       };

//     default:
//       return state;
//   }
// }

// const initialCustomerState = {
//   fullName: "",
//   nationalID: "",
//   createdAt: "",
// };

// function customerReducer(state = initialCustomerState, action) {
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
//     default:
//       return state;
//   }
// }

// function deposit(amount) {
//   return { type: "action/deposit", payload: amount };
// }

// function withdraw(amount) {
//   return { type: "action/withdraw", payload: amount };
// }

// function requestLoan(amount, purpose) {
//   return { type: "requestLoan", payload: { amount: amount, purpose: purpose } };
// }

// function payLoan() {
//   return { type: "payLoan" };
// }

// function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }

// function updateName(fullName) {
//   return {
//     type: "customer/createCustomer",
//     payload: fullName,
//   };
// }

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

// store.dispatch(deposit(1000));

// console.log(store.getState());

// store.dispatch(createCustomer("atul ", "maihu"));
// console.log(store.getState());

export default store;

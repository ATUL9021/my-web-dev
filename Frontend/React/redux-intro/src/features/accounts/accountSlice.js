import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      if (action.payload <= state.balance) {
        state.balance = state.balance - action.payload;
      }
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { amount, purpose };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + state.loan;
      },
    },

    payLoan(state, action) {
      if (state.balance >= state.loan) {
        state.balance = state.balance - state.loan;
        state.loan = 0;
        state.loanPurpose = "";
      }
    },

    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);
const { withdraw, requestLoan, convertingCurrency, payLoan } =
  accountSlice.actions;
export default accountSlice.reducer;
export { withdraw, requestLoan, convertingCurrency, payLoan };

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
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

//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }

export function deposit(amount, currency) {
  if (currency === "USD") {
    return { type: "action/deposit", payload: amount };
  }

  return function (dispatch, getState) {
    // console.log("hey ", getState);

    async function get() {
      dispatch({ type: "account/convertingCurrency" });
      const api = "https://api.frankfurter.dev";

      const res = await fetch(`${api}/v2/rate/${currency}/USD`);
      const data = res.json();
      amount = amount * data.rate;
      console.log(getState());
      dispatch({ type: "action/deposit", payload: amount });
    }
    get();
  };
}

// export function withdraw(amount) {
//   return { type: "action/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return { type: "requestLoan", payload: { amount: amount, purpose: purpose } };
// }

// export function payLoan() {
//   return { type: "payLoan" };
// }

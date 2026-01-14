import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StateInterface {
  accountCreation: boolean;
  accountChange: boolean;
  setPnL: boolean;
  updatePnl: boolean;
}

const initialState: StateInterface = {
  accountCreation: false,
  accountChange: false,
  setPnL: false,
  updatePnl: false,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    enableModal: (state, action: PayloadAction<{ name: keyof StateInterface}>) => {
      const modalName = action.payload.name;
      state[modalName] = true;
    },

    disableModal: (state, action: PayloadAction<{ name: keyof StateInterface }>) => {
      const modalName = action.payload.name;
      state[modalName] = false;
    },
  },
});

export default modalSlice.reducer;
export const { enableModal, disableModal } = modalSlice.actions;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initState {
  date_d: string | null;
}

const initialState: initState = {
  date_d: null,
};

export const DayDateSlice = createSlice({
  name: "DayDate",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string | null>) => {
      state.date_d = action.payload;
    },
  },
});

export const { setDate } = DayDateSlice.actions;
export default DayDateSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PnL {
    date: string,
    pnl_roi: 'PnL' | 'RoI',
    amount: number,
}

interface stateInterf {
    List_Pnls: PnL[]
}

const initialState: stateInterf = {
    List_Pnls: []
};

const PnLSlice = createSlice({
    name: "pnl",
    initialState,
    reducers: {
        createPnl: (state, action: PayloadAction<PnL>) => {
            state.List_Pnls.push(action.payload)
        },
        updatePnl: (state, action: PayloadAction<PnL>) => {
            const index = state.List_Pnls.findIndex(
                pnl => pnl.date === action.payload.date
            );

            if (index !== -1) {
                state.List_Pnls[index] = action.payload;
            }
        }
    },
});

export default PnLSlice.reducer;
export const { createPnl, updatePnl } = PnLSlice.actions;
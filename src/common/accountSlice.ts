import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface accountInterface {
    name: string,
    balance: number,
}

interface stateInterface {
    currentAccount: accountInterface,
    AllAccounts: accountInterface[]
}

const initialState: stateInterface = {
    currentAccount: {
        name: '',
        balance: 0
    },
    AllAccounts: []
}

const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        createAccount: (state, p: PayloadAction<accountInterface>) => {
            state.currentAccount.name = p.payload.name,
                state.currentAccount.balance = p.payload.balance
        },
        changeAccount: (state, p: PayloadAction<{ name: string }>) => {
            const accountFound = state.AllAccounts.find(
                acc => acc.name === p.payload.name
            )
            if (accountFound) {
                state.currentAccount = accountFound
            }
        },
        updateBalance: (state, p: PayloadAction<{ amount: number }>) => {

            state.currentAccount.balance += p.payload.amount;
        }
    }
})

export default accountSlice.reducer;
export const { createAccount, changeAccount, updateBalance } = accountSlice.actions;
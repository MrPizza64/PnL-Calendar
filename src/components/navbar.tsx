import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../common/store"
import styled from "styled-components"
import { Button } from "./button"
import { Wallet } from "./Wallet"
import { enableModal } from "../common/modalSlice"

const StyledNavbar = styled.div`
    width: 100%;
    display: flex;
    padding: 0.25rem 5%;
    box-sizing: border-box;
    align-content: center;
    justify-content: end;
    z-index: 1;
`

export const NavBar = () => {
    const accounts = useSelector((state:RootState) => state.accounts)
    const dispatch = useDispatch();
    if (accounts.currentAccount){
        return (
            <StyledNavbar>
                <Wallet/>   
                <Button variant="tertiary" onClick={()=>{
                    dispatch(enableModal({name: 'accountChange'}))
                }}>{accounts.currentAccount.name}</Button>
            </StyledNavbar>
        )
    }
}
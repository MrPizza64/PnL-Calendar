import { useSelector } from "react-redux"
import type { RootState } from "../common/store"
import styled from "styled-components"
import { Button } from "./button"
import { Wallet } from "./Wallet"

const StyledNavbar = styled.div`
    background-color: #0A0D12;
    width: 100%;
    position: fixed;
    display: flex;
    padding: 0.5rem;
    box-sizing: border-box;
    align-content: center;
    justify-content: end;
    z-index: 1;
`

export const NavBar = () => {
    const accounts = useSelector((state:RootState) => state.accounts)
    if (accounts.currentAccount){
        return (
            <StyledNavbar>
                <Wallet/>   
                <Button variant="tertiary">{accounts.currentAccount.name}</Button>
            </StyledNavbar>
        )
    }
}
import { useSelector } from "react-redux"
import type { RootState } from "../common/store"
import styled from "styled-components"
import { colors_palette } from "../common/palette"
import { StyledText } from "./texts"
import { useState } from "react"

const WalletContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 1rem;  
    gap: 0.5rem;
    margin: 1rem;
    background-color: ${colors_palette.light};
    border-radius: 0.5rem;
    color: white;
`

const Eye = styled.img`
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        opacity: 0.5
    }
`


export const Wallet = () => {
    const balance = useSelector((state: RootState) => state.accounts.currentAccount.balance)

    const images = [
        '/EyeOpen.png',
        '/EyeClosed.png'
    ];

    const [currentImg, setCurrentImg] = useState(0);

    const handleClick = () => {
        setCurrentImg((prev) => (prev + 1) % images.length);
    };

    return (
        <WalletContainer>
            {images[currentImg] === '/EyeOpen.png' ? 
            <StyledText>{`${balance} USD$`}</StyledText>
            : <StyledText>$$$</StyledText>
            }
            <Eye
                src={images[currentImg]}
                alt="imagen"
                onClick={handleClick}
            />
        </WalletContainer>
    )
}
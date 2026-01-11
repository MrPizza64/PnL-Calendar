import styled from "styled-components";
import { colors_palette } from "../../common/palette";
import { StyledTittle } from "../texts";
import type React from "react";

const StyledModal = styled.div`
    background-color: ${colors_palette.dark};
    border-radius: 1rem;
    border: 0.2rem solid ${colors_palette.light};
    padding: 1rem 4rem 1rem 4rem;
    max-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const BlurBackground = styled.div`
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100%;
    z-index: 1;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

interface BaseModalProps {
    children: React.ReactNode,
    title?: string,
}

export const BaseModal = (
    {
        children, 
        title = '',
    }: BaseModalProps) => {

    return (
        <BlurBackground>
            <StyledModal>
                <StyledTittle>{title}</StyledTittle>
                {children}
            </StyledModal>
        </BlurBackground>
    );
};
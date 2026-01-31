import styled from "styled-components";
import { colors_palette } from "../../common/palette";
import { StyledTittle } from "../texts";
import type React from "react";
import { useObserver } from "../../common/observer";

const StyledModal = styled.div<{ $visible: boolean }>`
    background-color: ${colors_palette.dark};
    border-radius: 1rem;
    border: 0.2rem solid ${colors_palette.light};
    padding: 1rem 4rem 1rem 4rem;
    width: 30%;
    max-width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    transition: all 0.4s ease;
    & {
        opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    }
`

const BlurBackground = styled.div`
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100%;
    z-index: 2;
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
    const { ref, visible } = useObserver();

    return (
        <BlurBackground>
            <StyledModal ref={ref} $visible={visible}>
                <StyledTittle>{title}</StyledTittle>
                {children}
            </StyledModal>
        </BlurBackground>
    );
};
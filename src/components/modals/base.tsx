import styled from "styled-components";
import { colors_palette } from "../../common/palette";
import { StyledTittle } from "../texts";
import type React from "react";
import { useObserver } from "../../common/observer";

const StyledModal = styled.div`
    background-color: ${colors_palette.dark};
    border-radius: 1rem;
    border: 0.15rem solid ${colors_palette.light};
    padding: 1rem 4rem;
    width: 25%;
    max-width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const BlurBackground = styled.div<{ $visible: boolean }>`
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100%;
    z-index: 2;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    
    transition: opacity 0.5s ease;
    & {
        opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    }
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
        <BlurBackground ref={ref} $visible={visible}>
            <StyledModal>
                <StyledTittle>{title}</StyledTittle>
                {children}
            </StyledModal>
        </BlurBackground>
    );
};
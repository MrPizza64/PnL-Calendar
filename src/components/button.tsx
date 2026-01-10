import type React from "react";
import styled from "styled-components";
import { colors_palette } from "../common/palette";

type Variants = 'primary' | 'secondary' | "tertiary";

interface ButtonProps {
    variant?: Variants,
    children: React.ReactNode,
    onClick: ()=> void
}

const variantBackgroundcolors = {
    primary: colors_palette.yellow,
    secondary: colors_palette.skyblue,
    tertiary: 'transparent',
}

const transitionColors = {
    primary: colors_palette.dark_yellow,
    secondary: colors_palette.light_skyblue,
    tertiary: 'transparent'
}

const ButtonContainer = styled.button<{variant: Variants}>`
    border: 0;
    background-color: ${({variant}) => variantBackgroundcolors[variant]};
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem 2rem;
    margin: 1rem;
    border-radius: 0.75rem;
    cursor: pointer;
    ${({variant}) => variant == 'primary' && `
        border-radius: 50px 0px 50px 0px;
    `}

    transition: all 0.3s ease;

    &:hover{
        background-color: ${({variant}) => transitionColors[variant]}
    }
`

export const Button = ({
    variant = 'primary',
    children,
    onClick
    } : ButtonProps) => {

    return (
        <ButtonContainer variant={variant} onClick={onClick}>
            {children}
        </ButtonContainer>
    )
};
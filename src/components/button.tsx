import type React from "react";
import styled from "styled-components";
import { colors_palette } from "../common/palette";

type Variants = 'primary' | 'secondary' | "tertiary";

interface ButtonProps {
    variant?: Variants,
    children: React.ReactNode,
    onClick?: ()=> void,
    type?: "button" | "submit" | "reset"
}

const VariantColors = {
    variantBackgroundcolors: {
        primary: colors_palette.yellow,
        secondary: colors_palette.skyblue,
        tertiary: 'transparent',
    },
    transitionBackgroundColors: {
        primary: colors_palette.dark_yellow,
        secondary: colors_palette.light_skyblue,
        tertiary: 'transparent'
    },
    transitionColors: {
        primary: 'black',
        secondary: 'black',
        tertiary: 'grey',
    }
}

const ButtonContainer = styled.button<{variant: Variants}>`
    border: 0;
    background-color: ${({variant}) => VariantColors.variantBackgroundcolors[variant]};
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem 2rem;
    margin: 1rem;
    border-radius: 0.75rem;
    cursor: pointer;
    ${({variant}) => variant == 'primary' && `
        border-radius: 50px 0px 50px 0px;
    `}
    ${({variant}) => variant == 'tertiary' &&`
        color: white;
    `}
    transition: all 0.3s ease;

    &:hover{
        background-color: ${({variant}) => VariantColors.transitionBackgroundColors[variant]};
        color: ${({variant}) => VariantColors.transitionColors[variant]};
    };
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
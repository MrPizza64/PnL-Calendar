import { Button } from "../components/button"
import { StyledText, StyledTittle } from "../components/texts"
import { useObserver } from "../common/observer"
import styled from "styled-components"

const TextContainer = styled.div<{visible: Boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
    transition: all 2s ease;
    & {
        transform: ${({visible}) => visible ? 'translateY(0)' : 'translateY(-5rem)'}
    }
`;

const BackgroundImage = styled.div`
    background-image: url('/tradingBackground.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
    width: 100%;
    height: 100%;
    position: fixed ;
    opacity: 0.5;
    mask-image: radial-gradient(
        ellipse at center,
        rgba(0,0,0,1) 40%,
        rgba(0,0,0,0) 100%
    );
`;

const PageContainer = styled.div<{visible: Boolean}>`
    & {
        opacity: ${({ visible }) => (visible ? 1 : 0)};
        transition: all 1.5s ease;
    }
`;

export const Landing = () => {

    const {ref, visible} = useObserver();
    return (
        <PageContainer ref={ref} visible={visible}>
            <BackgroundImage/>
            <TextContainer visible={visible}>
                <StyledTittle>PnL Calendar</StyledTittle>
                <StyledText>From traders to traders</StyledText>
                <Button>Start now</Button>
            </TextContainer>
        </PageContainer>
    )
};
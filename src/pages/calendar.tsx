import styled from "styled-components"
import { CalendarComponent } from "../components/calendarComponent"
import { useObserver } from "../common/observer"

const PageContainer = styled.div<{ $visible: boolean }>`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 1s ease;
    margin-top: 2.5rem;
    & {
         opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    }

    & > * {
         opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    }
`

export const Calendar = () => {
    const {ref, visible} = useObserver();
    return (
        <PageContainer ref={ref} $visible={visible}>
            <CalendarComponent />
        </PageContainer>
    )
}
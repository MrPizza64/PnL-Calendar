import styled from "styled-components"
import { StyledText } from "../components/texts"
import { CalendarComponent } from "../components/calendarComponent"

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Calendar = () => {
    return (
        <PageContainer>
            <CalendarComponent/>
        </PageContainer>
    )
}
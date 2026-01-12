import { DateTime, Interval } from 'luxon'
import { useState } from 'react';
import styled from 'styled-components';
import { StyledTittle } from './texts';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
`

const Day = styled.div<{ isCurrentMounth: boolean; isToday: boolean}>`
  flex: 0 0 calc(100% / 7);
  text-align: center;
  padding: 0.5rem 0.15rem;
  border: 1px solid;
  border-radius: 1rem;
  width: 8rem;
  height: 6rem;
  color: ${({ isCurrentMounth }) => (isCurrentMounth ? 'white' : '#888')};
  border-color: ${({ isToday }) => (isToday ? 'white' : '#444')};
  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};
`

export const CalendarComponent = () => {
    const today = DateTime.local();
    const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(
        today.startOf('month')
    );

    const dayOfMonth = Interval.fromDateTimes(
        firstDayOfActiveMonth.startOf('week'),
        firstDayOfActiveMonth.endOf('month').endOf('week')
    ).splitBy({ day: 1 }).map((day) => day.start).filter((day): day is DateTime => day != null);

    return (
        <>
            <StyledTittle>
                {firstDayOfActiveMonth.toFormat('LLLL')} {firstDayOfActiveMonth.year}
            </StyledTittle>
            <CalendarContainer>
                {dayOfMonth.map((day, dayIndex) => {
                    const isCurrentMonth = day.month === firstDayOfActiveMonth.month;
                    const isToday = day.hasSame(today, 'day');
                    return (
                        <Day key={dayIndex} isCurrentMounth={isCurrentMonth} isToday={isToday}>
                            {day?.day}
                        </Day>
                    )
                })}
            </CalendarContainer>
        </>
    )
}
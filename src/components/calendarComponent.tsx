import { DateTime, Interval } from 'luxon'
import { useState } from 'react';
import styled from 'styled-components';
import { StyledTittle } from './texts';
import { useDispatch, useSelector } from 'react-redux';
import { enableModal } from '../common/modalSlice';
import type { RootState } from '../common/store';
import { colors_palette } from '../common/palette';
import { setDate } from '../common/dayDateSlice';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
`

const Day = styled.div<{ isCurrentMounth: boolean; isToday: boolean, pnl_roi: 'none' | 'positive' | 'negative' }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  flex: 0 0 calc(100% / 7);
  text-align: center;
  padding: 0.5rem 0.15rem;
  border: 3px solid;
  border-radius: 1rem;
  width: 8rem;
  cursor: pointer;
  height: 6rem;
  color: ${({ isCurrentMounth }) => (isCurrentMounth ? 'white' : '#888')};
  border-color: ${({ isToday }) => (isToday ? 'white' : '#444')};
  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};

  ${({ pnl_roi }) => pnl_roi == 'positive' && `
    border-color: ${colors_palette.green};
    color: ${colors_palette.green};
  `}
  
  ${({ pnl_roi }) => pnl_roi == 'negative' && `
    border-color: ${colors_palette.red};
    color: ${colors_palette.red};
  `}
  transition: all 0.3s ease;

  &:hover{
    border-color: grey;
  }
`

export const CalendarComponent = () => {
    const today = DateTime.local();
    const dispatch = useDispatch();
    const pnlList = useSelector(
        (state: RootState) => state.pnl.List_Pnls
    );
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
                    const PnL = pnlList.find(pnl => {
                        const pnlDate = DateTime.fromISO(pnl.date).toISODate();
                        return pnlDate === day.toISODate();
                    });

                    let pnl_roi: 'positive' | 'negative' | 'none' = 'none'
                    if (PnL) {
                        if (PnL.amount > 0) {
                            pnl_roi = 'positive'
                        } else if (PnL.amount < 0) {
                            pnl_roi = 'negative'
                        }
                    };

                    return (
                        <Day
                            key={dayIndex}
                            isCurrentMounth={isCurrentMonth}
                            isToday={isToday}
                            pnl_roi={pnl_roi}
                            onClick={() => {
                                dispatch(setDate(`${day.toISODate()}`))
                                dispatch(enableModal({ name: 'setPnL' }));
                            }}>
                            {pnl_roi !== 'none' ? (
                                <>
                                    <span>Day: {day?.day}</span>
                                    <span>{PnL?.pnl_roi}</span>
                                    {PnL?.pnl_roi == 'RoI' ? <span>{PnL.amount}%</span> : <span>{PnL?.amount} USD</span>}
                                </>
                            ) : <span>Day: {day?.day}</span>}
                        </Day>
                    )
                })}
            </CalendarContainer>
        </>
    )
}
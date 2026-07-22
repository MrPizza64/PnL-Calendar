import { DateTime, Interval } from 'luxon'
import { useState } from 'react';
import styled from 'styled-components';
import { StyledSmallText, StyledTittle } from './texts';
import { useDispatch, useSelector } from 'react-redux';
import { enableModal } from '../common/modalSlice';
import type { RootState } from '../common/store';
import { colors_palette } from '../common/palette';
import { setDate } from '../common/dayDateSlice';
import { Button } from './button';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 7rem;
  gap: 1rem;
  width: 100%;
`

const Day = styled.div<{ isToday: boolean, pnl_roi: 'none' | 'positive' | 'negative' }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  flex: 0 0 calc(100% / 7);
  text-align: center;
  padding: 0.25rem 1.75rem;
  border: 0.15rem solid;
  border-radius: 1rem;
  cursor: pointer;
  height: 6rem;
  overflow: hidden;
  border-color: ${({ isToday }) => (isToday ? 'white' : colors_palette.light)};
  font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};

  ${({ pnl_roi }) => pnl_roi == 'positive' && `
    border-color: ${colors_palette.second_green};
    background-color: ${colors_palette.dark_green};
    color: ${colors_palette.second_green};
  `}
  
  ${({ pnl_roi }) => pnl_roi == 'negative' && `
    border-color: ${colors_palette.red};
    background-color: ${colors_palette.dark_red};
    color: ${colors_palette.red};
  `}
  transition: all 0.3s ease;

  &:hover{
    border-color: grey;
  }

  span, p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`

export const CalendarComponent = () => {
    const today = DateTime.local();
    const dispatch = useDispatch();
    const pnlList = useSelector(
        (state: RootState) => state.pnl.List_Pnls
    );

    const currentAccount = useSelector(
        (state: RootState) => state.accounts.currentAccount.name
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
            <div style={{ display: 'flex', alignItems: "center", gap: "1rem"}}>
                <Button variant='secondary' onClick={() => {
                    setFirstDayOfActiveMonth(prev => prev.minus({ months: 1 }))
                }}>Prev.</Button>
                <StyledTittle>
                    {firstDayOfActiveMonth.toFormat('LLLL')} {firstDayOfActiveMonth.year}
                </StyledTittle>
                <Button variant='secondary' onClick={() => {
                    setFirstDayOfActiveMonth(prev => prev.plus({ months: 1}))
                }}>Next</Button>

            </div>
            <CalendarContainer>
                {dayOfMonth.map((day, dayIndex) => {
                    const isCurrentMonth = day.month === firstDayOfActiveMonth.month;
                    const isToday = day.hasSame(today, 'day');
                    const PnL = pnlList.find(pnl => {
                        const pnlDate = DateTime.fromISO(pnl.date).toISODate();
                        const sameDay = pnlDate === day.toISODate();
                        const sameAccount = pnl.account === currentAccount;

                        return sameDay && sameAccount;
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
                            isToday={isToday}
                            pnl_roi={pnl_roi}
                            onClick={() => {
                                dispatch(setDate(`${day.toISODate()}`))
                                if (pnl_roi !== 'none') {
                                    dispatch(enableModal({ name: 'updatePnl' }))
                                } else {
                                    dispatch(enableModal({ name: 'setPnL' }));
                                }
                            }}>
                            {pnl_roi !== 'none' ? (
                                <>
                                    {
                                        isCurrentMonth ? (
                                            <StyledSmallText>Day {day?.day}</StyledSmallText>

                                        ) : (
                                            <StyledSmallText><strong>Day {day?.day}</strong></StyledSmallText>
                                        )
                                    }
                                    <StyledSmallText>{PnL?.pnl_roi}</StyledSmallText>
                                    {PnL?.pnl_roi == 'RoI' ? <StyledSmallText>{PnL.amount}%</StyledSmallText> : <StyledSmallText>{PnL?.amount} USD</StyledSmallText>}
                                </>
                            ) : (
                                <>
                                    {
                                        isCurrentMonth ? (
                                            <StyledSmallText>Day {day?.day}</StyledSmallText>

                                        ) : (
                                            <StyledSmallText><strong>Day {day?.day}</strong></StyledSmallText>
                                        )
                                    }
                                </>
                            )
                            }
                        </Day>
                    )
                })}
            </CalendarContainer>
        </>
    )
}
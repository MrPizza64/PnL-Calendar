import styled from "styled-components";
import { TextInput } from "../textInput"
import { BaseModal } from "./base"
import { z } from 'zod';
import { Button } from "../button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../common/store";
import { disableModal } from "../../common/modalSlice";
import { updatePnl } from "../../common/PnlSlice";
import { SelectInput } from "../selectInput";
import { StyledText } from "../texts";
import { updateBalance } from "../../common/accountSlice";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const schema = z.object({
    amount: z.number(),
    pnl_roi: z.enum(['PnL', 'RoI']),
});

type FormData = z.infer<typeof schema>;



export const UpdatePnl = () => {
    const modal = useSelector((state: RootState) => state.modals.updatePnl);
    const date = useSelector((state: RootState) => state.daydate.date_d);
    const dispatch = useDispatch();
    const acc = useSelector((state: RootState) => state.accounts.currentAccount)

    const pnlThatDay = useSelector(
        (state: RootState) => state.pnl.List_Pnls.find(
            pnl => pnl.date === date &&
                pnl.account === acc.name
        )
    );

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            amount: 0,
            pnl_roi: 'PnL'
        }
    });

    if (!modal) return null;

    const onSubmit = (data: FormData) => {
        const oldAmount = pnlThatDay?.amount ?? 0;

        const diff = data.amount - (pnlThatDay?.amount ?? 0);
        dispatch(disableModal({ name: 'updatePnl' }));
        dispatch(updatePnl({
            ...data,
            date: date!,
            account: acc.name,
        }))
        dispatch(updateBalance({ amount: diff }))
    };

    return (
        <BaseModal title="Update PnL">
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <SelectInput {...register('pnl_roi')}>
                    <option value='' disabled>Select...</option>
                    <option value='PnL'>PnL</option>
                    <option value='RoI'>RoI</option>
                </SelectInput>

                {errors.pnl_roi && <StyledText>{errors.pnl_roi.message}</StyledText>}

                <TextInput
                    placeholder="Amount"
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                />
                {errors.amount && <StyledText>{errors.amount.message}</StyledText>}

                <div>
                    <Button variant="tertiary" type='button' onClick={() => {
                        reset()
                        dispatch(disableModal({ name: "updatePnl" }))
                    }}>Cancel</Button>
                    <Button variant="secondary" type="submit">Update</Button>
                </div>
            </StyledForm>
        </BaseModal>
    )
};
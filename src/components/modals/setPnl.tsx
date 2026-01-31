import { useForm } from "react-hook-form"
import { TextInput } from "../textInput"
import { BaseModal } from "./base"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../common/store";
import { StyledText } from "../texts";
import { Button } from "../button";
import { disableModal } from "../../common/modalSlice";
import { SelectInput } from "../selectInput";
import styled from "styled-components";
import { createPnl } from "../../common/PnlSlice";
import { updateBalance } from "../../common/accountSlice";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const schema = z.object({
  pnl_roi: z.enum(['PnL', 'RoI']),
  amount: z.number(),
});

type FormData = z.infer<typeof schema>;

export const SetPnL = () => {
  const PnL = useSelector((state: RootState) => state.modals.setPnL);
  const dispatch = useDispatch();
  const dateISO = useSelector((state: RootState) => state.daydate.date_d);
  const acc = useSelector((state: RootState) => state.accounts.currentAccount)
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      pnl_roi: undefined,
      amount: 1,
    }
  });

  const onSubmit = (data: FormData) => {
    if (data.amount < 0) {
      if ((acc.balance + data.amount) < 0) {
        alert('You cant set a PnL Lower then your Total Balance.')
        return;
      }
    }
    if (acc.balance == 0){
      alert('You burned the Account!')
      return;
    }
    dispatch(disableModal({ name: 'setPnL' }));
    dispatch(createPnl({
      ...data,
      date: dateISO ?? new Date().toISOString(),
      account: acc.name,
      balance_to_date: acc.balance
    }));
    dispatch(updateBalance({ amount: data.amount }))

    reset();
  };

  if (!PnL) return null;

  return (
    <BaseModal title="Set PnL">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledText>Select PnL (USD$) or ROI (%) Option</StyledText>

        <SelectInput {...register("pnl_roi")}>
          <option value="" disabled>Select...</option>
          <option value="PnL">PnL</option>
          <option value="RoI">RoI</option>
        </SelectInput>

        {errors.pnl_roi && <StyledText>{errors.pnl_roi.message}</StyledText>}

        <StyledText>Write with '-' if its negative PnL/RoI</StyledText>

        <TextInput
          type="number"
          placeholder="Amount"
          {...register("amount", { valueAsNumber: true })}
        />

        {errors.amount && <StyledText>{errors.amount.message}</StyledText>}

        <div>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => {
              dispatch(disableModal({ name: 'setPnL' }));
              reset();
            }}
          >
            Cancel
          </Button>

          <Button type="submit" variant="secondary">
            Continue
          </Button>
        </div>
      </StyledForm>
    </BaseModal>
  );
};

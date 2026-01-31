import styled from "styled-components"
import { BaseModal } from "./base"
import { SelectInput } from "../selectInput"
import { StyledText } from "../texts"
import type { RootState } from "../../common/store"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../button"
import { disableModal, enableModal } from "../../common/modalSlice"
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changeAccount } from "../../common/accountSlice"

const schema = z.object({
    account: z.string()
})

type FormData = z.infer<typeof schema>;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`
export const ChangeAccount = () => {
    const modal = useSelector((state: RootState) => state.modals.accountChange);
    const allAcc = useSelector((state: RootState) => state.accounts.AllAccounts);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    if (!modal) return null;

    const onSubmit = (data: FormData) => {
        dispatch(disableModal({ name: 'accountChange' }));
        dispatch(changeAccount({ name: data.account }))
    };

    return (
        <BaseModal title="Change Account">
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Button variant='tertiary' onClick={() => {
                    dispatch(disableModal({ name: 'accountChange' }))
                    dispatch(enableModal({ name: 'accountCreation' }))
                }}>Want another account? Create One Clicking on this text.</Button>
                <SelectInput
                    {...register('account')}
                >
                    {allAcc.map((account, accountIndex) => {
                        return (
                            <option value={account.name} key={accountIndex}>{account.name}</option>
                        )
                    })}
                </SelectInput>

                {errors.account && <StyledText>{errors.account.message}</StyledText>}

                <div>
                    <Button variant="tertiary" onClick={() => {
                        dispatch(disableModal({ name: 'accountChange' }))
                    }}>Cancel</Button>
                    <Button type="submit" variant="secondary">Change</Button>
                </div>
            </StyledForm>
        </BaseModal>
    )
}
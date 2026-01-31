import { BaseModal } from "./base";
import { TextInput } from "../textInput";
import { Button } from "../button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../common/store";
import { createAccount } from "../../common/accountSlice";
import { disableModal } from "../../common/modalSlice";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledText } from "../texts";
import styled from "styled-components";

const schema = z.object({
    name: z.string().min(4, 'Your name needs to have more then 4 characters'),
    balance: z.number('The account balance is required'),
})

type FormData = z.infer<typeof schema>;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`

export const CreateAccountModal = () => {
    const { accountCreation } = useSelector(
        (state: RootState) => state.modals
    )

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            balance: 0,
        },
    });

    const onSubmit = (data: FormData) => {
        if (data.balance < 1){
            alert('Your balance have to be more then 0')
            return;
        }
        dispatch(createAccount(data));
        reset();
        dispatch(disableModal({ name: "accountCreation" }));
    };

    if (accountCreation == true) {
        return (
            <BaseModal title="Account Creation">
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        type="text"
                        placeholder="Name"
                        {...register("name")}
                    />
                    {errors.name && <StyledText>{errors.name.message}</StyledText>}

                    <TextInput
                        type="number"
                        placeholder="Balance"
                        {...register("balance", { valueAsNumber: true })}
                    />
                    {errors.balance && <StyledText>{errors.balance.message}</StyledText>}

                    <div>
                        <Button
                            variant="tertiary"
                            onClick={() => {
                                reset();
                                dispatch(disableModal({ name: "accountCreation" }));
                            }}
                        >
                            Cancel
                        </Button>

                        <Button variant="secondary" type="submit">
                            Create
                        </Button>
                    </div>
                </StyledForm>
            </BaseModal>
        )
    } else {
        return null;
    }

}
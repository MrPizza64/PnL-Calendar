import { BaseModal } from "./base";
import { TextInput } from "../textInput";
import { Button } from "../button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "../../common/store";
import { createAccount } from "../../common/accountSlice";
import { disableModal } from "../../common/modalSlice";

export const CreateAccountModal = () => {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0);
    const { accountCreation } = useSelector(
        (state: RootState) => state.modals
    )

    const dispatch = useDispatch();

    if (accountCreation == true) {
        return (
                <BaseModal title="Account Creation">
                    <TextInput
                        type="text"
                        placeholder="Name"
                        onChange={(e) => {
                            const value = e.target.value;
                            setName(value);
                        }}
                    />
                    <TextInput
                        type="number"
                        placeholder="Balance"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setBalance(value === "" ? 0 : parseInt(value, 10));
                            }
                        }}
                    />
                    <div>
                        <Button variant="tertiary" onClick={() => {
                            dispatch(disableModal({ name: 'accountCreation' }))
                        }}>Cancel</Button>

                        <Button variant="secondary" onClick={() => {
                            dispatch(createAccount({ name, balance }))
                        }}>Create</Button>
                    </div>
                </BaseModal>
        )
    } else {
        return null;
    }

}
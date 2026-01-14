import { CreateAccountModal } from "./createAccount";
import { SetPnL } from "./setPnl";
import { UpdatePnl } from "./updatePnl";

const ModalsCompiler = () => {

    return (
        <>
          <CreateAccountModal/>  
          <SetPnL/>
          <UpdatePnl/>
        </>
    )
}

export default ModalsCompiler;
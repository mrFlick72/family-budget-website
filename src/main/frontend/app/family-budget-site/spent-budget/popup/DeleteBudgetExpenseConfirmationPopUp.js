import React from "react"
import ConfirmationPopUp from "../../../component/layout/ConfirmationPopUp";

export default ({deleteBudgetExpenseAction, modal}) =>
    <ConfirmationPopUp confirmationHandler={deleteBudgetExpenseAction}
                       modalId={modal.id}
                       modalMessageBody={modal.message}
                       modalTitle={modal.title} />

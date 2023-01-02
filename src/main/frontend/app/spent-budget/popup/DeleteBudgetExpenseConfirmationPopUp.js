import React from "react"
import ConfirmationPopUp from "../../component/layout/ConfirmationPopUp";

export default ({deleteBudgetExpenseAction, modal, open, handleClose}) =>
    <ConfirmationPopUp confirmationHandler={deleteBudgetExpenseAction}
                       modalId={modal.id}
                       handleClose={handleClose}
                       open={open}
                       modalMessageBody={modal.message}
                       modalTitle={modal.title}/>

import React from "react"
import ConfirmationPopUp from "../../../component/layout/ConfirmationPopUp";

export default ({deleteBudgetRevenueAction, modal, open, handleClose}) =>
    <ConfirmationPopUp confirmationHandler={deleteBudgetRevenueAction}
                       modalId={modal.id}
                       handleClose={handleClose}
                       open={open}
                       modalMessageBody={modal.message}
                       modalTitle={modal.title}/>

import React from "react"
import SpentBudgetForm from "../budget/SpentBudgetForm";
import YesAndNoButtonGroup from "../../../component/layout/YesAndNoButtonGroup";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const CreateNewBudgetExpensePopupV2 = ({
                                           open,
                                           handleClose,
                                           modal,
                                           searchTagRegistry,
                                           spentBudgetHandlers,
                                           budgetExpense,
                                           saveCallback
                                       }) => {
    return <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{modal.title}</DialogTitle>

        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <SpentBudgetForm spentBudgetData={budgetExpense}
                                 spentBudgetHandlers={spentBudgetHandlers}
                                 searchTagRegistry={searchTagRegistry.map(searchTag => {
                                     return {value: searchTag.key, label: searchTag.value}
                                 })}/>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <YesAndNoButtonGroup yesIcon="fas fa-cart-plus fa-lg"
                                 yesFun={saveCallback}
                                 buttonMessages={{
                                     "noLabel": modal.closeButtonLable,
                                     "yesLabel": modal.saveButtonLable
                                 }}/>
        </DialogActions>
    </Dialog>
}

export default CreateNewBudgetExpensePopupV2
import React from "react"
import SpentBudgetForm from "../budget/SpentBudgetForm";
import YesAndNoButtonGroup from "../../../component/layout/YesAndNoButtonGroup";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";

const CreateNewBudgetExpensePopUp = ({
                                         open,
                                         handleClose,
                                         modal,
                                         searchTagRegistry,
                                         spentBudgetHandlers,
                                         budgetExpense,
                                         saveCallback
                                     }) => {
    return <Dialog onClose={handleClose} open={open} fullWidth scroll="paper">
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
            <YesAndNoButtonGroup yesIcon={<AddShoppingCart/>}
                                 yesFun={saveCallback}
                                 noFun={handleClose}
                                 buttonMessages={{
                                     "noLabel": modal.closeButtonLable,
                                     "yesLabel": modal.saveButtonLable
                                 }}/>
        </DialogActions>
    </Dialog>
}

export default CreateNewBudgetExpensePopUp
import React from "react"
import SpentBudgetForm from "../budget/SpentBudgetForm";
import YesAndNoButtonGroup from "../../component/layout/YesAndNoButtonGroup";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";
import selectUiAdapterFor from "../../search-tags/SearchTagsUIAdapter";

const SaveBudgetExpensePopUp = ({
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
            <SpentBudgetForm spentBudgetData={budgetExpense}
                             spentBudgetHandlers={spentBudgetHandlers}
                             searchTagRegistry={selectUiAdapterFor(searchTagRegistry)}/>
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

export default SaveBudgetExpensePopUp
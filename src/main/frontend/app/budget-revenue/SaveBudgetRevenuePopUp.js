import React from "react"
import ConfirmationPopUp from "../component/layout/ConfirmationPopUp";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import SpentBudgetForm from "../spent-budget/budget/SpentBudgetForm";
import selectUiAdapterFor from "../search-tags/SearchTagsUIAdapter";
import YesAndNoButtonGroup from "../component/layout/YesAndNoButtonGroup";
import {AddShoppingCart} from "@mui/icons-material";
import BudgetRevenueForm from "./BudgetRevenueForm";

export default ({budgetRevenue, handlers, saveCallback, modal, open, handleClose}) =>
    <Dialog onClose={handleClose} open={open} fullWidth scroll="paper">
        <DialogTitle>{modal.title}</DialogTitle>

        <DialogContent>
            <BudgetRevenueForm budgetRevenueData={budgetRevenue}
                               budgetRevenueHandlers={handlers}/>
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

import React from "react"
import YesAndNoButtonGroup from "../../component/layout/YesAndNoButtonGroup";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {AddShoppingCart} from "@mui/icons-material";
import FormSelect from "../../component/form/FormSelect";
import MonthsSelector from "../MonthsSelector";
import YearSelector from "../YearSelector";
import selectUiAdapterFor from "../../search-tags/SearchTagsUIAdapter";

const SearchBudgetExpensePopUp = ({
                                      open,
                                      handleClose,
                                      modal,
                                      month,
                                      year,
                                      searchTags,
                                      searchTagRegistry,
                                      monthRegistry,
                                      handlers,
                                      saveCallback
                                  }) => {
    return <Dialog onClose={handleClose} open={open} fullWidth scroll="paper">
        <DialogTitle>{modal.title}</DialogTitle>

        <DialogContent>
            <FormSelect options={selectUiAdapterFor(searchTagRegistry)} multi={true}/>
            <MonthsSelector monthRegistry={monthRegistry} month={month} handler={handlers.month}/>
            <YearSelector year={year} handler={handlers.year}/>
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

export default SearchBudgetExpensePopUp
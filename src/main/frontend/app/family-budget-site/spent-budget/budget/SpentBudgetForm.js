import React from "react"

import FormMoneyFormat from "../../../component/form/FormMoneyFormat";
import FormTextArea from "../../../component/form/FormTextArea";
import {v1 as uuidv1} from 'uuid';
import FormSelect from "../../../component/form/FormSelect";
import {Box} from "@mui/material";
import FormDatePicker, {DateFormatPattern} from "../../../v2/form/FormDatePicker";
import moment from "moment";

export default ({spentBudgetComponentId, spentBudgetData, spentBudgetHandlers, searchTagRegistry}) => {
    let spentBudgetComponentIdAux = spentBudgetComponentId || {}
    return <Box>
        <FormDatePicker
            label={"Date:"}
            value={moment(spentBudgetData.date, DateFormatPattern)}
            onClickHandler={spentBudgetHandlers.date}/>

        <FormMoneyFormat componentId={spentBudgetComponentIdAux.amount || uuidv1()}
                          componentLabel="Amount:"
                          value={spentBudgetData.amount}
                          onChangeHandler={spentBudgetHandlers.amount}/>

        <FormSelect multi={false}
                    componentId={spentBudgetComponentIdAux.searchTag || uuidv1()}
                    componentLabel="Search Tag:"
                    value={spentBudgetData.searchTag}
                    onChangeHandler={spentBudgetHandlers.searchTag}
                    options={searchTagRegistry}/>

        <FormTextArea value={spentBudgetData.note}
                      onChangeHandler={spentBudgetHandlers.note}
                      componentId={spentBudgetComponentIdAux.note || uuidv1()}
                      componentLabel="Note:"
                      componentPlaceholder="Note..."/>
    </Box>
}
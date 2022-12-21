import React from "react"

import FormMoneyFormat from "../../../component/form/FormMoneyFormat";
import FormDatePicker from "../../../component/form/FormDatePicker";
import FormTextArea from "../../../component/form/FormTextArea";
import {v1 as uuidv1} from 'uuid';
import FormSelect from "../../../component/form/FormSelect";

export default ({spentBudgetComponentId, spentBudgetData, spentBudgetHandlers, searchTagRegistry}) => {
    let spentBudgetComponentIdAux = spentBudgetComponentId || {}
    return <div>
        <FormDatePicker componentId={spentBudgetComponentIdAux.date || uuidv1()}
                        componentLabel="Date:"
                        value={spentBudgetData.date}
                        onChangeHandler={spentBudgetHandlers.date}/>

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
    </div>
}
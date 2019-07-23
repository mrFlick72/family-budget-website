import React from "react"

import FormNumberFormat from "../../../component/form/FormNumberFormat";
import FormDatePicker from "../../../component/form/FormDatePicker";
import FormTextArea from "../../../component/form/FormTextArea";
import uuidv1 from 'uuid/v1';
import FormSelect from "../../../component/form/FormSelect";

export default ({spentBudgetComponentId, spentBudgetData, spentBudgetHandlers, searchTagRegistry}) => {
    let spentBudgetComponentIdAux = spentBudgetComponentId || {}
    return <div>
        <FormDatePicker componentId={spentBudgetComponentIdAux.date || uuidv1()}
                        componentLabel="Date:"
                        value={spentBudgetData.date}
                        onChangeHandler={spentBudgetHandlers.date}/>

        <FormNumberFormat componentId={spentBudgetComponentIdAux.amount || uuidv1()}
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
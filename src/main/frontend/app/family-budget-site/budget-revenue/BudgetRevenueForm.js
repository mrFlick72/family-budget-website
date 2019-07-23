import React from "react"

import FormNumberFormat from "../../component/form/FormNumberFormat";
import FormDatePicker from "../../component/form/FormDatePicker";
import FormTextArea from "../../component/form/FormTextArea";
import uuidv1 from 'uuid/v1';

export default ({budgetRevenueComponentId, budgetRevenueData, budgetRevenueHandlers}) => {
    let budgetRevenueComponentIdAux = budgetRevenueComponentId || {}
    return <div>
        <FormDatePicker componentId={budgetRevenueComponentIdAux.date || uuidv1()}
                        componentLabel="Date:"
                        value={budgetRevenueData.date}
                        onChangeHandler={budgetRevenueHandlers.date}/>

        <FormNumberFormat componentId={budgetRevenueComponentIdAux.amount || uuidv1()}
                          componentLabel="Amount:"
                          value={budgetRevenueData.amount}
                          onChangeHandler={budgetRevenueHandlers.amount}/>

        <FormTextArea value={budgetRevenueData.note}
                      onChangeHandler={budgetRevenueHandlers.note}
                      componentId={budgetRevenueComponentIdAux.note || uuidv1()}
                      componentLabel="Note:"
                      componentPlaceholder="Note..."/>
    </div>
}
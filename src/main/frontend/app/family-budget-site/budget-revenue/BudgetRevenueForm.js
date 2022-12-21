import React from "react"

import FormMoneyFormat from "../../component/form/FormMoneyFormat";
import FormDatePicker from "../../component/form/FormDatePicker";
import FormTextArea from "../../component/form/FormTextArea";
import {v1 as uuidv1} from 'uuid';

export default ({budgetRevenueComponentId, budgetRevenueData, budgetRevenueHandlers}) => {
    let budgetRevenueComponentIdAux = budgetRevenueComponentId || {}
    return <div>
        <FormDatePicker componentId={budgetRevenueComponentIdAux.date || uuidv1()}
                        componentLabel="Date:"
                        value={budgetRevenueData.date}
                        onChangeHandler={budgetRevenueHandlers.date}/>

        <FormMoneyFormat componentId={budgetRevenueComponentIdAux.amount || uuidv1()}
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
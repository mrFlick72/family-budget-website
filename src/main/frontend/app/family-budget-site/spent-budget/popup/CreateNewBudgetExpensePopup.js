import React from "react"
import SpentBudgetForm from "../budget/SpentBudgetForm";
import YesAndNoButtonGroup from "../../../component/layout/YesAndNoButtonGroup";

export default ({modal, searchTagRegistry, spentBudgetHandlers, budgetExpense, saveCallback}) => {

    return <div className="modal fade"
                id={modal.id}
                tabIndex="-1"
                role="dialog"
                aria-labelledby={modal.id + "Title"}
                aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id={modal.id + "Title"}>{modal.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <SpentBudgetForm spentBudgetData={budgetExpense}
                                     spentBudgetHandlers={spentBudgetHandlers}
                                     searchTagRegistry={searchTagRegistry.map(searchTag => {
                                         return {value: searchTag.key, label: searchTag.value}
                                     })}/>

                </div>
                <div className="modal-footer">
                    <YesAndNoButtonGroup yesIcon="fas fa-cart-plus fa-lg"
                                         yesFun={saveCallback}
                                         buttonMessages={{"noLabel": modal.closeButtonLable, "yesLabel": modal.saveButtonLable}}/>
                </div>
            </div>
        </div>
    </div>
}

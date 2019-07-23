import React from "react"
import DailyBudgetExpenseHeader from "./DailyBudgetExpenseHeader";
import DailyBudgetExpenseRow from "./DailyBudgetExpenseRow";

export default (props) => {
    let tableContent = [];
    let dailyBudgetExpenseRepresentationList = props.spentBudget.dailyBudgetExpenseRepresentationList || []
    dailyBudgetExpenseRepresentationList.forEach((dailySpentBudget, dailyBudgetHeaderIndex) => {
        tableContent.push(<DailyBudgetExpenseHeader key={"H-" + dailyBudgetHeaderIndex}
                                                    date={dailySpentBudget.date}
                                                    total={dailySpentBudget.total}/>)

        dailySpentBudget.budgetExpenseRepresentationList.forEach((budgetExpenseRepresentation, dailyBudgetColumnIndex) => {
            tableContent.push(<DailyBudgetExpenseRow key={"C-" + dailyBudgetHeaderIndex + "-" + dailyBudgetColumnIndex}
                                                     dailyBudgetExpense={budgetExpenseRepresentation}
                                                     openAttachmentPopUp={props.openAttachmentPopUp.bind(budgetExpenseRepresentation)}
                                                     openUpdateBudgetExpensePopUp={props.openUpdateBudgetExpensePopUp.bind(budgetExpenseRepresentation)}
                                                     openDeleteBudgetExpensePopUp={props.openDeleteBudgetExpensePopUp.bind(budgetExpenseRepresentation)}/>)
        })
    });

    return (<div className="table-responsive">
        <table className="table">
            <thead>
            <tr scope="row">
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Note</th>
                <th scope="col">Type</th>
                <th scope="col">Details</th>
            </tr>
            </thead>
            <tbody>
            {tableContent}
            </tbody>
            <tfoot>
            <tr scope="row">
                <td colSpan="5" scope="col"></td>
            </tr>
            <tr className="alert alert-info" scope="row">
                <td scope="col">Total:</td>
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col"></td>
                <td scope="col"><span role="alert">{props.spentBudget.total}</span></td>
            </tr>
            </tfoot>
        </table>
    </div>)
}
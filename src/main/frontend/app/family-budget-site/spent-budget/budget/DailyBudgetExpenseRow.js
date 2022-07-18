import React from "react"

export default (props) => {

    let budgetExpense = {
        "id": props.dailyBudgetExpense.id,
        "date": props.dailyBudgetExpense.date,
        "amount": props.dailyBudgetExpense.amount,
        "note": props.dailyBudgetExpense.note,
        "searchTag": {"value": props.dailyBudgetExpense.tagKey, "label": props.dailyBudgetExpense.tagValue}
    };

    return <tr scope="row">
        <td scope="col"></td>
        <td scope="col">{props.dailyBudgetExpense.amount}</td>
        <td scope="col">{props.dailyBudgetExpense.note}</td>
        <td scope="col">{props.dailyBudgetExpense.tagValue}</td>
        <td scope="col">
            <div className="btn-group" role="group">
                <a className="btn btn-secondary" href="#"
                   onClick={props.openUpdateBudgetExpensePopUp.bind(this, budgetExpense)}>
                    <i className="fas fa-edit fa-lg"></i> Edit</a>

                <a className="btn btn-secondary budget-expense-deletable-item" href="#"
                   onClick={props.openDeleteBudgetExpensePopUp.bind(this, props.dailyBudgetExpense)}>
                    <i className="fas fa-trash-alt fa-lg"></i> Delete</a>
            </div>
        </td>
    </tr>
}
import React from "react"
import BudgetRevenueRow from "./BudgetRevenueRow";

export default ({revenues, openDeletePopUp, openUpdatePopUp}) => {
    return (<div className="table-responsive">

        <table className="table">
            <thead>
            <tr scope="row">
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Note</th>
                <th scope="col">Options</th>
            </tr>
            </thead>
            <tbody>
            {
                revenues.map(revenue => <BudgetRevenueRow revenue={revenue}
                                                          openUpdatePopUp={openUpdatePopUp.bind(this, revenue)}
                                                          openDeletePopUp={openDeletePopUp.bind(this, revenue)}/>)
            }
            </tbody>
        </table>
    </div>)
}
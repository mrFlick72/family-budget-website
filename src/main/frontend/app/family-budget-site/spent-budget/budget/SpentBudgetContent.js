import React from "react"
import DailyBudgetExpenseHeader from "./DailyBudgetExpenseHeader";
import DailyBudgetExpenseRow from "./DailyBudgetExpenseRow";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

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
                                                     openUpdateBudgetExpensePopUp={props.openUpdateBudgetExpensePopUp.bind(budgetExpenseRepresentation)}
                                                     openDeleteBudgetExpensePopUp={props.openDeleteBudgetExpensePopUp.bind(budgetExpenseRepresentation)}/>)
        })
    });

    let table = (<div className="table-responsive">
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

    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Details</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableContent}
            </TableBody>
        </Table>
    </TableContainer>
}
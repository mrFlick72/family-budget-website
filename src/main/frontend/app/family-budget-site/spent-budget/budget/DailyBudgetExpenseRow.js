import React from "react"
import {Button, ButtonGroup, TableCell, TableRow} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";

export default ({key, dailyBudgetExpense, openUpdateBudgetExpensePopUp, openDeleteBudgetExpensePopUp}) => {

    let budgetExpense = {
        "id": dailyBudgetExpense.id,
        "date": dailyBudgetExpense.date,
        "amount": dailyBudgetExpense.amount,
        "note": dailyBudgetExpense.note,
        "searchTag": {"value": dailyBudgetExpense.tagKey, "label": dailyBudgetExpense.tagValue}
    };

    let element = <tr scope="row">
        <td scope="col"></td>
        <td scope="col">{dailyBudgetExpense.amount}</td>
        <td scope="col">{dailyBudgetExpense.note}</td>
        <td scope="col">{dailyBudgetExpense.tagValue}</td>
        <td scope="col">
            <div className="btn-group" role="group">
                <a className="btn btn-secondary" href="#"
                   onClick={openUpdateBudgetExpensePopUp.bind(this, budgetExpense)}>
                    <i className="fas fa-edit fa-lg"></i> Edit</a>

                <a className="btn btn-secondary budget-expense-deletable-item" href="#"
                   onClick={openDeleteBudgetExpensePopUp.bind(this, dailyBudgetExpense)}>
                    <i className="fas fa-trash-alt fa-lg"></i> Delete</a>
            </div>
        </td>
    </tr>;

    return <TableRow key={key} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
        <TableCell align="right"></TableCell>
        <TableCell align="right">{dailyBudgetExpense.amount}</TableCell>
        <TableCell align="right">{dailyBudgetExpense.note}</TableCell>
        <TableCell align="right">{dailyBudgetExpense.tagValue}</TableCell>
        <TableCell align="right">
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={openUpdateBudgetExpensePopUp.bind(this, budgetExpense)}><Edit/> Edit</Button>
                <Button onClick={openDeleteBudgetExpensePopUp.bind(this, dailyBudgetExpense)}><Delete/>Delete </Button>
            </ButtonGroup>
        </TableCell>
    </TableRow>

}
import React from "react"
import {TableCell, TableRow} from "@mui/material";

export default ({key, date, total}) =>
    <TableRow key={key} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
        <TableCell align="right">{date}</TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right">Total: {total}</TableCell>
    </TableRow>
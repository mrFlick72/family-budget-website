import React from "react"

import FormMoneyFormat from "../component/form/FormMoneyFormat";
import FormDatePicker, {DateFormatPattern} from "../component/form/FormDatePicker";
import FormTextArea from "../component/form/FormTextArea";
import {v1 as uuidv1} from 'uuid';
import {Box} from "@mui/material";
import moment from "moment/moment";

export default ({budgetRevenueData, budgetRevenueHandlers}) => {
    return <Box>
        <FormDatePicker
            id={uuidv1()}
            label={"Date:"}
            value={moment(budgetRevenueData.date, DateFormatPattern)}
            onClickHandler={budgetRevenueHandlers.date}/>

        <FormMoneyFormat
            id={uuidv1()}
            label="Amount:"
            required={true}
            handler={budgetRevenueHandlers.amount}
            value={budgetRevenueData.amount}/>


        <FormTextArea id={uuidv1()}
                      value={budgetRevenueData.note}
                      onChangeHandler={budgetRevenueHandlers.note}
                      label="Note:"/>

    </Box>
}
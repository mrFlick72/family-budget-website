import * as PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import {Money} from "@mui/icons-material";
import React from "react";

export function BudgetRevenuePageMenuItem({text}) {
    return <MenuItem
        icon={<Money/>}
        link="#/budget-revenue"
        text={text}/>
}

BudgetRevenuePageMenuItem.propTypes = {text: PropTypes.string};

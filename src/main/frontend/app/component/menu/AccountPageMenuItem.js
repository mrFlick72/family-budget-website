import MenuItem from "./MenuItem";
import {Person} from "@mui/icons-material";
import React from "react";

export default ({text}) => {
    return <MenuItem
        icon={<Person/>}
        link="/account/index"
        text={text}/>
}
import MenuItem from "./MenuItem";
import {Person} from "@mui/icons-material";
import React from "react";

export default ({text}) => {
    return <MenuItem
        link="/account/site/index.html"
        icon={<Person />}
        text={text}/>
}
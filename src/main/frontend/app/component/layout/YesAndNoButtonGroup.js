import React from "react"
import {Box, Button} from "@mui/material";
import {Close} from "@mui/icons-material";

export default ({buttonMessages, yesIcon, yesFun, noFun}) => {
    return <Box>
        <Button variant="contained" onClick={noFun} color="primary">
            <Close/> {buttonMessages.noLabel}
        </Button>
        <Button variant="contained" onClick={yesFun} color="success">
            {yesIcon} {buttonMessages.yesLabel}
        </Button>
    </Box>
}
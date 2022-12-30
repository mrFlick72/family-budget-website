import React from "react"
import {Box, Paper} from "@mui/material";

export default ({total}) => {
    return <Box component={Paper} color="primary">
        Total: {total || 0.00}
    </Box>
}
import {Grid, TextField, useTheme} from "@mui/material";
import React from "react";

export default function FormTextArea({id, label, type, required, autoFocus, disabled, suffix, value, onChangeHandler,row}) {
    const theme = useTheme()
    return <Grid container spacing={8} alignItems="flex-end" style={theme.formInputText}>
        {suffix && <Grid item>
            {suffix}
        </Grid>}
        <Grid item md={true} sm={true} xs={true}>
            <TextField name={id} id={id} label={label} type={type || "text"} disabled={disabled}
                       variant="outlined" fullWidth autoFocus={autoFocus} required={required || false}
                       value={value}
                       multiline
                       maxRows={row || 5}
                       minRows={row || 5}
                       onChange={onChangeHandler}/>
        </Grid>
    </Grid>
}
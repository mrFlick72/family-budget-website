import React from "react"
import Select from "react-select";
import {Grid, InputLabel, OutlinedInput, useTheme} from "@mui/material";

export default ({id, label, multi, options, value, onChangeHandler, suffix}) => {
    const theme = useTheme()
    return <Grid container spacing={8} alignItems="flex-end" style={theme.formInputText} >
        {suffix && <Grid item>
            {suffix}
        </Grid>}
        <Grid item md={true} sm={true} xs={true}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                labelId={id}
                isMulti={multi}
                id={id}
                value={value}
                label={label}

                options={options}
                onChange={onChangeHandler}
                input={<OutlinedInput/>}/>
        </Grid>
    </Grid>

}
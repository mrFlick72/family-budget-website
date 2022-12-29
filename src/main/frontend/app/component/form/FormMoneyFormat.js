import React from "react";
import {Grid, TextField} from "@mui/material";
import PropTypes from "prop-types";
import {IMaskInput} from "react-imask";
import {useTheme} from "@emotion/react";

const InputMask = React.forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput

            {...other}
            variant="outlined"
            mask={Number}
            scale={2}
            signed={false}
            padFractionalZeros={true}
            normalizeZeros={true}

            // additional number interval options (e.g.)
            min={0}
            radix={'.'}
            mapToRadix={['.']}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />);
});

InputMask.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function FormMoneyFormat({id, label, required, autoFocus, disabled, suffix, value, handler}) {
    const theme = useTheme()
    return <Grid container spacing={8} alignItems="flex-end" style={theme.formInputText}>
        {suffix && <Grid item>
            {suffix}
        </Grid>}
        <Grid item md={true} sm={true} xs={true}>
            <TextField
                fullWidth
                label={label}
                variant="outlined"
                required={required}
                autoFocus={autoFocus}
                disabled={disabled}
                value={value}
                onChange={handler}
                name={id}
                id={id}
                InputProps={{
                    inputComponent: InputMask,
                }}
            />
        </Grid>
    </Grid>
}
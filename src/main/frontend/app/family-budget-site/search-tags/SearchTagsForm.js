import React from "react"
import FormInputTextField from "../../v2/form/FormInputTextField";
import FormButton from "../../v2/form/FormButton";
import {Save} from "@mui/icons-material";

export default ({searchTag, handler}) => {
    return <div>
        <FormInputTextField handler={handler.valueHandler}
                            autoFocus={true}
                            value={searchTag.value}
                            id="searchTagValue"
                            label="Search Tag Value"
        />
        <FormButton type="button"
                    labelPrefix={<Save/>}
                    label="Save"
                    onClickHandler={handler.submitHandler.bind(this, searchTag.key, searchTag.value)}
        />
    </div>
}
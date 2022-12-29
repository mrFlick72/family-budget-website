import React from "react"
import {Save} from "@mui/icons-material";
import FormInputTextField from "../../component/form/FormInputTextField";
import FormButton from "../../component/form/FormButton";

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
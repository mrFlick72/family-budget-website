import React from "react";
import FormInputTextField from "../component/form/FormInputTextField";

export default ({year, handler}) => {
    return <FormInputTextField id="yearSelector"
                               value={year}
                               label=""
                               type="number"
                               handler={handler}/>
}
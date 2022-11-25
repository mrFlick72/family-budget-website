import React from "react"
import TextInput from "../../component/form/TextInput";

export default ({searchTag, handler}) => {
    return <div>
        <TextInput componentId="searchTagValue" componentLabel="Search Tag Value" value={searchTag.value}
                   onChangeHandler={handler.valueHandler}/>
        <button type="button" className="btn btn-secondary"
                onClick={handler.submitHandler.bind(this, searchTag.key, searchTag.value)}>
            <i className="fas fa-save fa-lg"></i> Save
        </button>
    </div>
}
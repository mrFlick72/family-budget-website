import React from "react"

export default ({value, onChangeHandler, componentId, componentLabel, componentPlaceholder}) => {
    return <div className="form-group">
        <label htmlFor={componentId}>{componentLabel} </label>
        <input className="form-control" type="text" id={componentId}
               onChange={onChangeHandler}
               placeholder={componentPlaceholder}
               value={value}/>
    </div>
}
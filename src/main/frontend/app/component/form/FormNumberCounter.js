import React from "react"
import NumberFormat from "react-number-format";

export default ({value, onChangeHandler, componentId, componentLabel, componentPlaceholder}) => {
    return <div className="form-group">
        <label htmlFor={componentId}>{componentLabel} </label>
        <input className="form-control" type="number" id={componentId}
               onChange={onChangeHandler}
               placeholder={componentPlaceholder}
               value={value}/>
    </div>
}
import React from "react"

export default ({reference, modalId, iconClassNames, callback, label}) => {
    let popUpSelector = '#' + modalId;

    let delegate = callback ? callback : () => $(popUpSelector).modal("show")
    return <i ref={reference} className="nav-item active">
        <a href="#" onClick={delegate} className="nav-link" data-toggle="modal"
           data-target={popUpSelector}><i className={iconClassNames}></i> {label}</a>
    </i>
}
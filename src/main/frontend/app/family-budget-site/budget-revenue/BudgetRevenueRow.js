import React from "react"

export default ({revenue, openDeletePopUp, openUpdatePopUp}) => {
    return <tr>
        <td>{revenue.date}</td>
        <td>{revenue.amount}</td>
        <td>{revenue.note}</td>
        <td scope="col">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-secondary"
                        onClick={openUpdatePopUp}>
                    <i className="fas fa-edit fa-lg"></i> Edit
                </button>

                <button type="button" className="btn btn-secondary"
                        onClick={openDeletePopUp}>
                    <i className="fas fa-trash-alt fa-lg"></i> Delete
                </button>
            </div>
        </td>
    </tr>
}
import React from "react"

export default ({totals}) => {
    return <div className="table-responsive">
        <table className="table">
            <thead>
            <tr>
                <th>Category</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {totals.map(total => <tr>
                <td>{total.searchTagValue}</td>
                <td>{total.total}</td>
            </tr>)}
            </tbody>
        </table>
    </div>
}
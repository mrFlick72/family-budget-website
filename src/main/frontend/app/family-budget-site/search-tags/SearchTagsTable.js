import React from "react"

export default ({searchTagsRegistry}) => {
    return <div className="table-responsive">
        <table className="table">
            <thead>
            <tr scope="row">
                <th scope="col">Search Key</th>
                <th scope="col">Description</th>
                <th scope="col">Operation</th>
            </tr>
            </thead>
            <tbody>
            {searchTagsRegistry.map(searchTag => {
                return <tr>
                    <td>{searchTag.key}</td>
                    <td>{searchTag.value}</td>
                    <td>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-secondary">
                                <i className="fas fa-trash-alt fa-lg"></i>
                            </button>
                            <button type="button" className="btn btn-secondary">
                                <i className="fas fa-edit fa-lg"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}
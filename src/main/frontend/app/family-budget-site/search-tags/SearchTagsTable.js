import React from "react"

export default ({searchTagsRegistry, handler}) => {
    return <div>
        <div className="table-responsive">
            <table className="table">
                <thead>
                <tr scope="row">
                    <th scope="col">Description</th>
                    <th scope="col">Operation</th>
                </tr>
                </thead>
                <tbody>
                {searchTagsRegistry.map(searchTag => {
                    return <tr>
                        <td>{searchTag.value}</td>
                        <td>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-secondary"
                                        onClick={handler.editHandler.bind(this, searchTag.key, searchTag.value)}>
                                    <i className="fas fa-edit fa-lg"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    </div>
}
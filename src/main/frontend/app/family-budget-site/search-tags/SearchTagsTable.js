import React from "react"

export default ({searchTagsRegistry}) => {
    return <div className="table-responsive">
        <table className="table">
            <thead>
            <tr scope="row">
                <th scope="col">Search Key</th>
                <th scope="col">Description</th>
            </tr>
            </thead>
            <tbody>
            {searchTagsRegistry.map(searchTag => {
                return <tr><td>{searchTag.key}</td><td>{searchTag.value}</td></tr>
            })}
            </tbody>
        </table>
    </div>
}
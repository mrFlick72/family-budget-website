import React from "react"
import ConfirmationPopUp from "../../component/layout/ConfirmationPopUp";

export default ({searchTagsRegistry, handler, modal}) => {
    return <div><ConfirmationPopUp confirmationHandler={handler.confirmationHandler.bind(this, modal.id)}
                                   modalId={modal.id}
                                   modalMessageBody={modal.message}
                                   modalTitle={modal.title}/>

        <div className="table-responsive">
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
                                <button type="button" className="btn btn-secondary"
                                        onClick={handler.deleteHandler.bind(this, searchTag.key, modal.id)}>
                                    <i className="fas fa-trash-alt fa-lg"></i>
                                </button>

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
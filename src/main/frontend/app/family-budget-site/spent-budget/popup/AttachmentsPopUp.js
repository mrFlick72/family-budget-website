import React from "react"
import PopupContainer from "../../../component/layout/PopupContainer";
import FormUploadFile from "../../../component/form/FormUploadFile";

export default ({attachments, attachmentFileRef, modal, actionHandler}) =>
    <PopupContainer modal={modal}
                    form={<div>
                        <ul className="list-group pb-3">
                            {attachments
                                .map(attachment => {
                                    return <li
                                        className="list-group-item d-flex justify-content-between align-items-center">
                                        {attachment}

                                        <div className="btn-group" role="group">
                                            <button type="button" className="btn btn-secondary"
                                                    onClick={actionHandler.downloadFun.bind(this, attachment)}>
                                                <i className="fas fa-file-download fa-lg"></i>
                                            </button>
                                            <button type="button" className="btn btn-secondary"
                                                    onClick={actionHandler.deleteFun.bind(this, attachment)}>
                                            <i className="fas fa-trash-alt fa-lg"></i>
                                            </button>
                                        </div>

                                    </li>
                                })}
                        </ul>
                        <FormUploadFile componentId="attachmentFile" componentLabel="File: "
                                        fileRef={attachmentFileRef}/>
                    </div>}
                    noFun={actionHandler.noFun}
                    saveFun={actionHandler.saveFun}/>

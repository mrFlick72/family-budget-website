import React from "react";
import {BudgetExpenseFileFileRepository} from "../../../domain/repository/BudgetExpenseFileFileRepository";
import FormUploadFile from "../../../component/form/FormUploadFile";
import YesAndNoButtonGroup from "../../../component/layout/YesAndNoButtonGroup";

export default class ImportExportInCsvPopUp extends React.PureComponent{

    constructor(props) {
        super(props);

        this.fileRef = React.createRef();
        this.loadFile = this.loadFile.bind(this);

        this.budgetExpenseFileRepository = new BudgetExpenseFileFileRepository();
    }

    loadFile() {
        let fileContent = this.fileRef.current.files[0];
        this.budgetExpenseFileRepository.loadBudgetExpenseFile(fileContent)
            .then(response => {
                $(`#${this.props.modal.id}`).modal("hide")
            });
    }

    render() {
        return <div id={this.props.modal.id} className="modal fade loadCsvFile" tabIndex="-1"
                    role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.props.modal.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body">
                            <FormUploadFile fileRef={this.fileRef}
                                            componentId="csvFileInput"
                                            componentLabel={this.props.modal.formUploadFileLabel}/>
                        </div>
                        <div className="modal-footer">
                            <YesAndNoButtonGroup yesIcon="fas fa-upload fa-lg"
                                                 yesFun={this.loadFile}
                                                 buttonMessages={{
                                                     "noLabel": this.props.modal.closeButtonLabel,
                                                     "yesLabel": this.props.modal.saveButtonLabel
                                                 }}/>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}
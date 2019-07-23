import React from "react"
import 'react-select/dist/react-select.css';
import {SearchCriteriaOnUrl} from "../../../domain/model/SearchCriteriaOnUrl";
import FormSelect from "../../../component/form/FormSelect";
import YesAndNoButtonGroup from "../../../component/layout/YesAndNoButtonGroup";

class SearchFilterPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTag: []
        };
        this.searchCriteriaOnUrl = new SearchCriteriaOnUrl();

        this.submitSearchCriteria = this.submitSearchCriteria.bind(this);
    }


    onChangeHandler(searchTag) {
        this.setState({searchTag})
    }

    submitSearchCriteria() {
        let searchTag = this.state.searchTag.map(searchTag => searchTag.value).join(",");
        window.location.href = `${this.props.action}?choicedMonth=${this.searchCriteriaOnUrl.getMonth()}&year=${this.searchCriteriaOnUrl.getYear()}&searchTag=${searchTag}`;
    }

    render() {
        return <div className="modal fade searchByTagsModal"
                    id="searchByTagsModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="searchByTagsModalTitle"
                    aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={this.props.modal.id + "Title"}>{this.props.modal.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                        <div className="modal-body">
                            <FormSelect multi={true}
                                        componentLabel="Search Tag:"
                                        componentId="searchTagFilter"
                                        value={this.state.searchTag}
                                        onChangeHandler={this.onChangeHandler.bind(this)}
                                        options={this.props.searchTagRegistry.map(searchTag => {
                                            return {value: searchTag.key, label: searchTag.value}
                                        })}/>

                        </div>
                        <div className="modal-footer">
                            <YesAndNoButtonGroup yesIcon="fas fa-search fa-lg"
                                                 yesFun={this.submitSearchCriteria}
                                                 buttonMessages={{
                                                     "noLabel": this.props.modal.closeButtonLable,
                                                     "yesLabel": this.props.modal.saveButtonLable
                                                 }}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default SearchFilterPopUp

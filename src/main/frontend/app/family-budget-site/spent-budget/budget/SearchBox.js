import React from "react"

import 'react-select/dist/react-select.css';
import {SearchCriteriaOnUrl} from "../../../domain/model/SearchCriteriaOnUrl";
import FormSelect from "../../../component/form/FormSelect";
import YesAndNoButtonGroup from "../../../component/layout/YesAndNoButtonGroup";
import FormMoneyFormat from "../../../component/form/FormMoneyFormat";
import FormNumberCounter from "../../../component/form/FormNumberCounter";

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.searchCriteriaOnUrl = new SearchCriteriaOnUrl();

        this.state = {
            month: this.searchCriteriaOnUrl.getMonth(),
            year: this.searchCriteriaOnUrl.getYear(),
            searchTag: []
        };

        this.submitSearchCriteria = this.submitSearchCriteria.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.display !== this.props.display) {
            this.setState({ display: nextProps.display })
        }
    }

    onChangeHandler(name, value) {
        this.setState({[name]: value})
    }

    onChangeYearHandler(e) {
        this.setState({[e.target.id]: e.target.value})
    }

    submitSearchCriteria() {
        let searchTag = this.state.searchTag.map(searchTag => searchTag.value).join(",");
        window.location.href = `${this.props.action}?choicedMonth=${this.state.month.value}&year=${this.state.year}&searchTag=${searchTag}`;
    }

    dispose() {
        this.setState({display: false})
    }

    render() {
        return <div className="searchBox" id="searchBox" style={{left: this.props.left, display: this.state.display ? "initial" : "none"}}>
            <FormSelect multi={true}
                        componentLabel="Search Tag:"
                        componentId="searchTagFilter"
                        value={this.state.searchTag}
                        onChangeHandler={this.onChangeHandler.bind(this, "searchTag")}
                        options={this.props.searchTagRegistry.map(searchTag => {
                            return {value: searchTag.key, label: searchTag.value}
                        })}/>

            <FormSelect multi={false}
                        componentLabel="Month:"
                        componentId="month"
                        value={this.state.month}
                        onChangeHandler={this.onChangeHandler.bind(this, "month")}
                        options={this.props.monthRegistry.map(month => {
                            return {value: month.monthValue, label: month.monthLabel}
                        })}/>

            <FormNumberCounter componentLabel="Year:"
                              componentId="year"
                              value={this.state.year}
                              onChangeHandler={this.onChangeYearHandler.bind(this)}/>


            <YesAndNoButtonGroup yesIcon="fas fa-search fa-lg"
                                 yesFun={this.submitSearchCriteria}
                                 noFun={this.dispose.bind(this)}
                                 buttonMessages={{
                                     "noLabel": this.props.modal.closeButtonLable,
                                     "yesLabel": this.props.modal.saveButtonLable
                                 }}/>
        </div>
    }
}

export default SearchBox

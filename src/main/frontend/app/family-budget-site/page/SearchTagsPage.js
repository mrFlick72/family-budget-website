import React from 'react'
import Menu from "../../component/menu/Menu";
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import SearchTagsTable from "../search-tags/SearchTagsTable";
import {SearchTagRepository} from "../../domain/repository/SearchTagRepository";
import SearchTagsForm from "../search-tags/SearchTagsForm";

export default class SearchTagsPage extends React.Component {

    constructor(props) {
        super(props)

        this.configMap = new FamilyBudgetPagesConfigMap()
        this.searchTagRepository = new SearchTagRepository()
        this.handler = this.handler.bind(this)
        this.state = {searchTagsRegistry: [], searchTagKey: "", searchTagValue: ""}
    }

    componentDidMount() {
        this.searchTagRepository.getSearchTagRegistry()
            .then(registry => {
                this.setState({searchTagsRegistry: registry})
            })
    }

    handler() {
        return {
            keyHandler: (value) => {
                console.log("key value: " + value.target.value)
                this.setState({searchTagKey: value.target.value});
            },
            valueHandler: (value) => {
                console.log("value value: " + value)

                this.setState({searchTagValue: value.target.value});
            },
            submitHandler: (searchTagKey, searchTagValue) => {
                console.log(searchTagKey)
                console.log(searchTagValue)
                this.searchTagRepository.saveSearchTag({key: searchTagKey, value: searchTagValue})
            }
        }
    }


    render() {
        return <div>
            <Menu messages={this.configMap.searchTags(this.props.messageRegistry).menuMessages}
                  links={this.props.links}></Menu>
            <div className="container-fluid">
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <SearchTagsForm searchTag={{key: this.state.searchTagKey, value: this.state.searchTagValue}}
                                            handler={this.handler()}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <SearchTagsTable searchTagsRegistry={this.state.searchTagsRegistry}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
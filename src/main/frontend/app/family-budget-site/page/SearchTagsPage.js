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
        this.state = {searchTagsRegistry: [], searchTagKeyToDelete: "", searchTagKey: "", searchTagValue: ""}
    }

    componentDidMount() {
        this.searchTagRepository.getSearchTagRegistry()
            .then(registry => {
                this.setState({searchTagsRegistry: registry})
            })
    }

    formHandler() {
        return {
            keyHandler: (value) => {
                this.setState({searchTagKey: value.target.value});
            },
            valueHandler: (value) => {
                this.setState({searchTagValue: value.target.value});
            },
            submitHandler: (searchTagKey, searchTagValue) => {
                this.searchTagRepository.saveSearchTag({key: searchTagKey, value: searchTagValue})
                    .then(ignore => this.searchTagRepository.getSearchTagRegistry())
                    .then(registry => {
                        this.setState({searchTagsRegistry: registry})
                    })
            }
        }
    }

    tableHandler() {
        return {
            editHandler: (searchTagKey, searchTagValue) => {
                this.setState({searchTagKey: searchTagKey, searchTagValue: searchTagValue})
            },
            deleteHandler: (searchTagKey, modalId) => {
                console.log(`#${modalId}`)
                this.setState({searchTagKeyToDelete: searchTagKey})
                $(`#${modalId}`).modal("show")

            },
            confirmationHandler: (modalId) => {
                this.searchTagRepository.deleteSearchTag(this.state.searchTagKeyToDelete)
                    .then(ignore => this.searchTagRepository.getSearchTagRegistry())
                    .then(registry => {
                        this.setState({searchTagsRegistry: registry})
                        $(`#${modalId}`).modal("hide")
                    })
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
                                            handler={this.formHandler()}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <SearchTagsTable searchTagsRegistry={this.state.searchTagsRegistry}
                                             modal={{
                                                 id: "deleteSearchTagModalId",
                                                 message: "Are you sure to delete this search tag?",
                                                 title: "Search Tag delete confirmation modal"
                                             }}
                                             handler={this.tableHandler()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
import React, {useEffect, useState} from 'react'
import Menu from "../../component/menu/Menu";
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import SearchTagsTable from "../search-tags/SearchTagsTable";
import SearchTagsForm from "../search-tags/SearchTagsForm";
import {getSearchTagRegistry, saveSearchTag} from "../../domain/repository/SearchTagRepository";

const SearchTagsPage = (props) => {
    let {messageRegistry} = props

    const configMap = new FamilyBudgetPagesConfigMap()

    const [searchTagsRegistry, setSearchTagsRegistry] = useState([])
    const [searchTagKey, setSearchTagKey] = useState("")
    const [searchTagValue, setSearchTagValue] = useState("")

    useEffect(() => {
        getSearchTagRegistry().then(registry => {
            setSearchTagsRegistry(registry)
        })
    })

    function formHandler() {
        return {
            valueHandler: (value) => {
                this.setState({searchTagValue: value.target.value});
            },
            submitHandler: (searchTagKey, searchTagValue) => {
                saveSearchTag({key: searchTagKey, value: searchTagValue})
                    .then(ignore => getSearchTagRegistry())
                    .then(registry => {
                        this.setState({searchTagsRegistry: registry})
                    })
            }
        }
    }

    function tableHandler() {
        return {
            editHandler: (searchTagKey, searchTagValue) => {
                setSearchTagKey(searchTagKey)
                setSearchTagValue(searchTagValue)
            }
        }
    }

    return <div>
        <Menu messages={configMap.searchTags(messageRegistry).menuMessages}
              links={this.props.links}></Menu>
        <div className="container-fluid">
            <div className="content">
                <div className="row">
                    <div className="col-12">
                        <SearchTagsForm searchTag={{key: searchTagKey, value: searchTagValue}}
                                        handler={formHandler()}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <SearchTagsTable searchTagsRegistry={searchTagsRegistry}
                                         modal={{
                                             id: "deleteSearchTagModalId",
                                             message: "Are you sure to delete this search tag?",
                                             title: "Search Tag delete confirmation modal"
                                         }}
                                         handler={tableHandler()}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default SearchTagsPage
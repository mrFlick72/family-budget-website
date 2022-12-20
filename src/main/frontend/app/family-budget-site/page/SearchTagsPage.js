import React, {useEffect, useState} from 'react'
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import SearchTagsTable from "../search-tags/SearchTagsTable";
import SearchTagsForm from "../search-tags/SearchTagsForm";
import {getSearchTagRegistry, saveSearchTag} from "../../domain/repository/SearchTagRepository";
import Menu from "../../component/menu/Menu";

const SearchTagsPage = (props) => {
    console.log("SearchTagsPage")

    let {messageRegistry, links} = props

    const configMap = new FamilyBudgetPagesConfigMap()

    const [searchTagsRegistry, setSearchTagsRegistry] = useState([])
    const [searchTagKey, setSearchTagKey] = useState("")
    const [searchTagValue, setSearchTagValue] = useState("")

    useEffect(() => {
        getSearchTagRegistry().then(registry => {
            console.log(registry)
            setSearchTagsRegistry(registry)
        })
    }, [])

    const formHandler = {
        valueHandler: (value) => {
            setSearchTagValue(value.target.value);
        },
        submitHandler: (searchTagKey, searchTagValue) => {
            saveSearchTag({key: searchTagKey, value: searchTagValue})
                .then(ignore => getSearchTagRegistry())
                .then(registry => {
                    setSearchTagsRegistry(registry)
                })
        }
    }


    const tableHandler = {
        editHandler: (searchTagKey, searchTagValue) => {
            setSearchTagKey(searchTagKey)
            setSearchTagValue(searchTagValue)
        }
    }

    return <div>
        <Menu messages={configMap.searchTags(messageRegistry).menuMessages} links={links}></Menu>

        <div className="container-fluid">
            <div className="content">
                <div className="row">
                    <div className="col-12">
                        <SearchTagsForm searchTag={{key: searchTagKey, value: searchTagValue}} handler={formHandler}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <SearchTagsTable searchTagsRegistry={searchTagsRegistry} handler={tableHandler}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default SearchTagsPage
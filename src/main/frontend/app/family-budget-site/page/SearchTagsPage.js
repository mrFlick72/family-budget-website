import React, {useEffect, useState} from 'react'
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import SearchTagsTable from "../search-tags/SearchTagsTable";
import SearchTagsForm from "../search-tags/SearchTagsForm";
import {getSearchTagRegistry, saveSearchTag} from "../../domain/repository/SearchTagRepository";
import themeProvider from "../../v2/theme/ThemeProvider";
import {Container, Paper, ThemeProvider} from "@mui/material";
import Separator from "../../v2/form/Separator";
import Menu from "../../v2/menu/Menu";
import AccountPageMenuItem from "../../v2/menu/AccountPageMenuItem";

const SearchTagsPage = (props) => {
    let {messageRegistry, links} = props
    const configMap = new FamilyBudgetPagesConfigMap()

    const [searchTagsRegistry, setSearchTagsRegistry] = useState([])
    const [searchTagKey, setSearchTagKey] = useState("")
    const [searchTagValue, setSearchTagValue] = useState("")

    useEffect(() => {
        getSearchTagRegistry().then(registry => {
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
    let theme = themeProvider

    return <ThemeProvider theme={theme}>
        <Paper variant="outlined">
            <Menu messages={configMap.searchTags(messageRegistry).menuMessages} links={links}>
                <AccountPageMenuItem text={configMap.searchTags(messageRegistry).menuMessages.userProfileLabel}/>
            </Menu>

            <Container>
                <SearchTagsForm searchTag={{key: searchTagKey, value: searchTagValue}} handler={formHandler}/>

                <Separator/>

                <SearchTagsTable searchTagsRegistry={searchTagsRegistry} handler={tableHandler}/>
            </Container>
        </Paper>
    </ThemeProvider>
}
export default SearchTagsPage
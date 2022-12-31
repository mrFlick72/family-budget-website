import React, {useEffect, useState} from 'react'
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import SearchTagsTable from "./SearchTagsTable";
import SearchTagsForm from "./SearchTagsForm";
import {getSearchTagRegistry, saveSearchTag} from "./SearchTagRepository";
import {Container, Paper, ThemeProvider} from "@mui/material";
import themeProvider from "../../theme/ThemeProvider";
import AccountPageMenuItem from "../../component/menu/AccountPageMenuItem";
import Separator from "../../component/form/Separator";
import Menu from "../../component/menu/Menu";

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
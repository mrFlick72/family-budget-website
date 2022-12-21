import React, {useEffect, useState} from "react"
import 'url-search-params-polyfill';
import {Route, Routes} from "react-router";
import {HashRouter} from "react-router-dom";
import SearchTagsPage from "./page/SearchTagsPage";
import {getAllMessageRegistry} from "../domain/repository/MessageRepository";

const links = {
    logOut: "/family-budget/oidc_logout.html",
    home: "/family-budget/index"
};

export default (props) => {

    let [messages, setMessages] = useState({})
    useEffect(() => {
        getAllMessageRegistry()
            .then(r => {
                setMessages(r)
            })
    }, [])

    return (
        <HashRouter>
            <Routes>
                {/*                <Route exact={true} path="/"
                       render={(props) => <BudgetExpensePage {...props} links={links}
                                                             messageRegistry={messageRegistry}/>}/>

                <Route exact={true} path="/budget-revenue"
                       render={(props) => <BudgetRevenuePage{...props} links={links}
                                                            messageRegistry={messageRegistry}/>}/>*/}
                <Route index path="/" exact={true}
                       element={<SearchTagsPage links={links} messageRegistry={messages}/>}/>
            </Routes>
        </HashRouter>)
}
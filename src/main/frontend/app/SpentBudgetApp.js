import React, {useEffect, useState} from "react"
import 'url-search-params-polyfill';
import {Route, Routes} from "react-router";
import {HashRouter} from "react-router-dom";
import SearchTagsPage from "./search-tags/SearchTagsPage";
import {getAllMessageRegistry} from "./messages/MessageRepository";
import BudgetExpensePage from "./spent-budget/BudgetExpensePage";
import BudgetRevenuePage from "./budget-revenue/BudgetRevenuePage";

const links = {
    logOut: "/family-budget/oidc_logout.html",
    home: "/family-budget/index"
};

export default () => {

    let [messageRegistry, setMessageRegistry] = useState({})
    useEffect(() => {
        getAllMessageRegistry()
            .then(data => {
                setMessageRegistry(data)
            })
    }, [])

    return (
        <HashRouter>
            <Routes>
                <Route exact={true} path="/"
                       element={<BudgetExpensePage links={links} messageRegistry={messageRegistry}/>}/>
                <Route exact={true} path="/budget-revenue"
                       element={<BudgetRevenuePage links={links} messageRegistry={messageRegistry}/>}/>
                <Route path="/search-tags" exact={true}
                       element={<SearchTagsPage links={links} messageRegistry={messageRegistry}/>}/>
            </Routes>
        </HashRouter>)
}
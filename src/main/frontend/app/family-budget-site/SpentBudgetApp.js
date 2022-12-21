import React, {useEffect, useState} from "react"
import 'url-search-params-polyfill';
import {Route, Routes} from "react-router";
import {HashRouter} from "react-router-dom";
import SearchTagsPage from "./page/SearchTagsPage";
import {getAllMessageRegistry} from "../domain/repository/MessageRepository";
import BudgetRevenuePage from "./page/BudgetRevenuePage";

const links = {
    logOut: "/family-budget/oidc_logout.html",
    home: "/family-budget/index"
};

export default (props) => {

    let [messageRegistry, setMessageRegistry] = useState({})
    useEffect(() => {
        getAllMessageRegistry()
            .then(data => {
                setMessageRegistry(data)
            })
    }, [])

    return (
        <HashRouter>
            {/*                <Route exact={true} path="/"
                       render={(props) => <BudgetExpensePage {...props} links={links}
                                                             messageRegistry={messageRegistry}/>}/>
*/}
            <Routes>

                {/*path="/budget-revenue"*/}
                <Route exact={true} path="/"
                       element={<BudgetRevenuePage links={links} messageRegistry={messageRegistry}/>}/>
                <Route path="/search-tags" exact={true}
                       element={<SearchTagsPage links={links} messageRegistry={messageRegistry}/>}/>
            </Routes>
        </HashRouter>)
}
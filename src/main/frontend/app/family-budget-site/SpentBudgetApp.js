import React, {useEffect, useState} from "react"
import 'url-search-params-polyfill';
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import BudgetExpensePage from "./page/BudgetExpensePage";
import BudgetRevenuePage from "./page/BudgetRevenuePage";
import SearchTagsPage from "./page/SearchTagsPage";
import {getAllMessageRegistry} from "../domain/repository/MessageRepository";

const links = {
    logOut: "/family-budget/oidc_logout.html",
    home: "/family-budget/index"
};

export function SpentBudgetApp() {

    useEffect(() => {
            getAllMessageRegistry()
                .then(r => setMessageRegistry(r))
        }
    )

    let [messageRegistry, setMessageRegistry] = useState([])
    return (
        <HashRouter>
            <Switch>
                <Route exact={true} path="/"
                       render={(props) => <BudgetExpensePage {...props} links={links}
                                                             messageRegistry={messageRegistry}/>}/>

                <Route exact={true} path="/budget-revenue"
                       render={(props) => <BudgetRevenuePage{...props} links={links}
                                                            messageRegistry={messageRegistry}/>}/>
                <Route exact={true} path="/search-tags"
                       render={(props) => <SearchTagsPage{...props} links={links}
                                                         messageRegistry={messageRegistry}/>}/>
            </Switch>
        </HashRouter>)
}
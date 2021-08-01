import React from "react"
import 'url-search-params-polyfill';
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import BudgetExpensePage from "./page/BudgetExpensePage";
import BudgetRevenuePage from "./page/BudgetRevenuePage";
import {MessageRepository} from "../domain/repository/MessageRepository";
import SearchTagsPage from "./page/SearchTagsPage";

const links = {
    logOut: "/family-budget/oidc_logout.html",
    home: "/family-budget/index"
};

export default class SpentBudgetApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {messageRegistry: []}

        this.messageRepository = new MessageRepository();
    }

    componentDidMount() {
        this.messageRepository.getAllMessageRegistry()
            .then(data => {
                console.log("messageRepository.getAllMessageRegistry")
                this.setState({messageRegistry: data})
            })
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact={true} path="/"
                           render={(props) => <BudgetExpensePage {...props} links={links}
                                                                 messageRegistry={this.state.messageRegistry}/>}/>

                    <Route exact={true} path="/budget-revenue"
                           render={(props) => <BudgetRevenuePage{...props} links={links}
                                                                messageRegistry={this.state.messageRegistry}/>}/>
                    <Route exact={true} path="/search-tags"
                           render={(props) => <SearchTagsPage{...props} links={links}
                                                                messageRegistry={this.state.messageRegistry}/>}/>
                </Switch>
            </HashRouter>)
    }
}
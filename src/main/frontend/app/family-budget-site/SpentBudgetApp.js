import React from "react"
import 'url-search-params-polyfill';
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import BudgetExpensePage from "./page/BudgetExpensePage";
import BudgetRevenuePage from "./page/BudgetRevenuePage";
import BudgetExpenseChartPage from "./page/BudgetExpenseChartPage";
import {MessageRepository} from "../domain/repository/MessageRepository";

const links = {
    logOut: "/family-budget/logout",
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

                    <Route exact={true} path="/budget-expense/chart"
                           render={(props) => <BudgetExpenseChartPage {...props} links={links}
                                                                      messageRegistry={this.state.messageRegistry}/>}/>

                    <Route exact={true} path="/budget-revenue"
                           render={(props) => <BudgetRevenuePage{...props} links={links}
                                                                messageRegistry={this.state.messageRegistry}/>}/>
                </Switch>
            </HashRouter>)
    }
}
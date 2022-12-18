import React from 'react'
import SpentBudgetContent from "../spent-budget/budget/SpentBudgetContent";
import Menu from "../../component/menu/Menu";
import SelectMonthlySpentBudget from "../../component/menu/SelectMonthlySpentBudget";
import OpenPopUpMenuItem from "../../component/menu/OpenPopUpMenuItem";
import {getMonth, getSearchTags, getYear} from "../../domain/model/SearchCriteriaOnUrl";
import {findBudgetExpense, saveBudgetExpense} from "../../domain/repository/BudgetExpenseRepository";

import TotalBySearchTags from "../spent-budget/menu/TotalBySearchTags";
import ContentCard from "../../component/layout/ContentCard";
import CreateNewBudgetExpensePopup from "../spent-budget/popup/CreateNewBudgetExpensePopup";
import DeleteBudgetExpenseConfirmationPopUp from "../spent-budget/popup/DeleteBudgetExpenseConfirmationPopUp";
import moment from "moment";
import PageNavigationMenuItem from "../../component/menu/PageNavigationMenuItem";
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";

export default class BudgetExpensePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            date: moment(),
            amount: "0.00",
            note: "",
            searchTag: "",

            displaySearchTab: false,

            spentBudget: {},
            deletableItem: {},
            searchTagRegistry: [],
            monthRegistry: []
        };

        this.searchTagRef = React.createRef();

        this.configMap = new FamilyBudgetPagesConfigMap();
        this.openSaveBudgetExpensePopUp = this.openSaveBudgetExpensePopUp.bind(this);
        this.saveBudgetExpense = this.saveBudgetExpense.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.savePopupEventHandlers = this.savePopupEventHandlers.bind(this);
        this.openSearchTab = this.openSearchTab.bind(this);
    }

    spentBudget() {
        from(findBudgetExpense({
            month: getMonth(),
            year: getYear(),
            searchTags: getSearchTags()
        })).subscribe(data => {
            this.setState({spentBudget: data})
        });
    }

    loadCommonData() {
        let loadMonthRegistryObservable = from(this.monthRepository.getMonthRegistry());
        let loadSearchTagRegistryObservable = from(this.searchTagRepository.getSearchTagRegistry());

        zipStatic(loadMonthRegistryObservable, loadSearchTagRegistryObservable)
            .subscribe(([monthRegistryValue, searchTagRegistryValue]) => {
                this.setState({
                    monthRegistry: monthRegistryValue,
                    searchTagRegistry: searchTagRegistryValue,
                });
            });
    }

    openSearchTab() {
        let offsetLeft = this.searchTagRef.current.offsetLeft;
        this.setState({
            leftSearchTab: offsetLeft,
            displaySearchTab: !this.state.displaySearchTab
        })
    }

    openDeleteBudgetExpensePopUp(dailyBudgetExpense) {
        this.setState({deletableItem: dailyBudgetExpense})
        $(`#${this.configMap.budgetExpense(this.props.messageRegistry).deleteModal.id}`).modal("show");

    }

    deleteItem() {
        this.deleteBudgetExpense(this.state.deletableItem.id)
            .then((response) => {
                if (response.status === 204) {
                    this.spentBudget();
                    $(`#${this.configMap.budgetExpense(this.props.messageRegistry).deleteModal.id}`).modal("hide");
                }
            })
    }

    savePopupEventHandlers() {
        return {
            date: (value) => {
                this.setState({date: value})
            },
            amount: (event) => {
                this.setState({amount: event.target.value})
            },
            searchTag: (searchTag) => {
                this.setState({searchTag: searchTag})
            },
            note: (event) => this.setState({"note": event.target.value})
        }
    }

    openSaveBudgetExpensePopUp() {
        this.setState({
            id: "",
            date: moment(),
            amount: "0.00",
            note: "",
            searchTag: ""
        });
        $(`#${this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}`).modal("show");
    }

    openUpdateBudgetExpensePopUp(expense) {
        this.setState({
            id: expense.id,
            date: moment(expense.date, "DD/MM/YYYY"),
            amount: expense.amount,
            note: expense.note,
            searchTag: expense.searchTag
        });

        $(`#${this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}`).modal("show");
    }

    saveBudgetExpense() {
        let budgetExpense = {
            id: this.state.id,
            date: this.state.date.format("DD/MM/YYYY"),
            amount: this.state.amount,
            note: this.state.note,
            tagKey: this.state.searchTag.value
        };

        saveBudgetExpense(budgetExpense)
            .then(response => {
                if (response.status === 201 || response.status === 204) {
                    this.spentBudget();
                    $(`#${this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}`).modal("hide");
                }
            })
    }

    componentDidMount() {
        this.loadCommonData();
        this.spentBudget();
    }


    render() {
        return (
            <div>
                <Menu messages={this.configMap.budgetExpense(this.props.messageRegistry).menuMessages}
                      links={this.props.links}>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <OpenPopUpMenuItem key="insertBudgetModal"
                                           callback={this.openSaveBudgetExpensePopUp}
                                           label={this.configMap.budgetExpense(this.props.messageRegistry).menuMessages.insertBudgetModal}
                                           modalId={this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}
                                           iconClassNames="fas fa-cart-plus fa-lg"/>

                        <OpenPopUpMenuItem key="searchByTagsModal"
                                           reference={this.searchTagRef}
                                           callback={this.openSearchTab}
                                           label={this.configMap.budgetExpense(this.props.messageRegistry).menuMessages.searchModal}
                                           modalId={this.configMap.budgetExpense(this.props.messageRegistry).searchFilterModal.id}

                        <PageNavigationMenuItem
                            menuItemLabel={this.configMap.budgetExpense(this.props.messageRegistry).menuMessages.searchTags}
                            link="/search-tags"
                            menuItemPrefixIcon="fas fa-tags fa-lg"/>
                    </ul>


                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="badge badge-info nav-item active total-box">
                            <h6>Total: <span>{this.state.spentBudget.total || 0.00}</span></h6>
                        </li>
                        <li className="nav-item active">
                            <SelectMonthlySpentBudget action={this.props.links.home}
                                                      name="selectMonthlySpentBudget"
                                                      monthRegistry={this.state.monthRegistry}
                                                      month={getMonth()}
                                                      year={getYear()}/>
                        </li>
                        <PageNavigationMenuItem menuItemLabel="Revenue"
                                                link="/budget-revenue"
                                                menuItemPrefixIcon="fas fa-money-bill-wave fa-lg"/>
                    </ul>
                </Menu>
                <div className="container-fluid">
                    <div className="content">

                        <CreateNewBudgetExpensePopup spentBudgetHandlers={this.savePopupEventHandlers()}
                                                     budgetExpense={{
                                                         id: this.state.id,
                                                         date: this.state.date,
                                                         amount: this.state.amount,
                                                         note: this.state.note,
                                                         searchTag: this.state.searchTag
                                                     }}
                                                     saveCallback={this.saveBudgetExpense}
                                                     searchTagRegistry={this.state.searchTagRegistry}
                                                     modal={this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal}/>

                        <DeleteBudgetExpenseConfirmationPopUp deleteBudgetExpenseAction={this.deleteItem}
                                                              modal={this.configMap.budgetExpense(this.props.messageRegistry).deleteModal}/>


                        <div className="row">
                            <div className="col-12 col-md-9">
                                <ContentCard
                                    header={this.configMap.budgetExpense(this.props.messageRegistry).cards.dailyDetails}>
                                    <SpentBudgetContent spentBudget={this.state.spentBudget}
                                                        searchTagRegistry={this.state.searchTagRegistry}
                                                        openUpdateBudgetExpensePopUp={this.openUpdateBudgetExpensePopUp.bind(this)}
                                                        openDeleteBudgetExpensePopUp={this.openDeleteBudgetExpensePopUp.bind(this)}/>
                                </ContentCard>
                            </div>

                            <div className="col-12 col-md-3">
                                <ContentCard
                                    header={this.configMap.budgetExpense(this.props.messageRegistry).cards.totalByCategories}>
                                    <TotalBySearchTags totals={this.state.spentBudget.totalDetailList || []}/>
                                </ContentCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
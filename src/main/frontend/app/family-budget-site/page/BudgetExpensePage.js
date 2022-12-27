import React, {useCallback, useEffect, useState} from 'react'
import SpentBudgetContent from "../spent-budget/budget/SpentBudgetContent";
import Menu from "../../component/menu/Menu";
import SelectMonthlySpentBudget from "../../component/menu/SelectMonthlySpentBudget";
import OpenPopUpMenuItem from "../../component/menu/OpenPopUpMenuItem";
import {getMonth, getSearchTags, getYear} from "../../domain/model/SearchCriteriaOnUrl";
import {
    deleteBudgetExpense,
    findBudgetExpense,
    saveBudgetExpense
} from "../../domain/repository/BudgetExpenseRepository";

import TotalBySearchTags from "../spent-budget/menu/TotalBySearchTags";
import ContentCard from "../../component/layout/ContentCard";
import CreateNewBudgetExpensePopup from "../spent-budget/popup/CreateNewBudgetExpensePopup";
import DeleteBudgetExpenseConfirmationPopUp from "../spent-budget/popup/DeleteBudgetExpenseConfirmationPopUp";
import moment from "moment";
import PageNavigationMenuItem from "../../component/menu/PageNavigationMenuItem";
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import {getMonthRegistry} from "../../domain/repository/MonthRepository";
import {getSearchTagRegistry} from "../../domain/repository/SearchTagRepository";
import {Container, Paper, ThemeProvider} from "@mui/material";
import AccountPageMenuItem from "../../v2/menu/AccountPageMenuItem";
import themeProvider from "../../v2/theme/ThemeProvider";
import {BudgetRevenuePageMenuItem} from "../../v2/menu/BudgetRevenuePageMenuItem";
import {SearchTagsPageMenuItem} from "../../v2/menu/SearchTagsPageMenuItem";

const BudgetExpensePage = (props) => {
    const {messageRegistry, links} = props
    const [id, setId] = useState("")
    const [date, setDate] = useState(moment())
    const [amount, setAmount] = useState("0.00")
    const [note, setNote] = useState("")
    const [searchTag, setSearchTag] = useState("")
    const [spentBudget, setSpentBudget] = useState({})
    const [deletableItem, setDeletableItem] = useState({})
    const [searchTagRegistry, setSearchTagRegistry] = useState([])
    const [monthRegistry, setMonthRegistry] = useState([])

    const configMap = new FamilyBudgetPagesConfigMap();

    function getSpentBudget() {
        findBudgetExpense({
            month: getMonth(),
            year: getYear(),
            searchTags: getSearchTags()
        }).then(data => {
            setSpentBudget(data)
        });
    }

    function loadCommonData() {
        getMonthRegistry().then(data => setMonthRegistry(data));
        getSearchTagRegistry().then(data => setSearchTagRegistry(data));
    }

    const openDeleteBudgetExpensePopUp = useCallback((dailyBudgetExpense) => {
        setDeletableItem(dailyBudgetExpense)
        $(`#${configMap.budgetExpense(messageRegistry).deleteModal.id}`).modal("show");

    }, [])

    const deleteItem = useCallback(() => {
        deleteBudgetExpense(deletableItem.id)
            .then((response) => {
                if (response.status === 204) {
                    getSpentBudget();
                    $(`#${configMap.budgetExpense(messageRegistry).deleteModal.id}`).modal("hide");
                }
            })
    }, [deletableItem])

    const savePopupEventHandlers = {
        date: (value) => {
            setDate(value)
        },
        amount: (event) => {
            setAmount(event.target.value)
        },
        searchTag: (searchTag) => {
            setSearchTag(searchTag)
        },
        note: (event) => setNote(event.target.value)
    }

    const openSaveBudgetExpensePopUp = useCallback(() => {
        setId("")
        setDate(moment())
        setAmount("0.00")
        setNote("")
        setSearchTag("")
        $(`#${configMap.budgetExpense(messageRegistry).newBudgetExpenseModal.id}`).modal("show");
    }, [])

    const openUpdateBudgetExpensePopUp = useCallback((expense) => {
        setId(expense.id)
        setDate(moment(expense.date, "DD/MM/YYYY"))
        setAmount(expense.amount)
        setNote(expense.note)
        setSearchTag(expense.searchTag)
        $(`#${configMap.budgetExpense(messageRegistry).newBudgetExpenseModal.id}`).modal("show");
    }, [])


    const saveExpense = useCallback(() => {
        let budgetExpense = {
            id: id,
            date: date.format("DD/MM/YYYY"),
            amount: amount,
            note: note,
            tagKey: searchTag.value
        };

        saveBudgetExpense(budgetExpense)
            .then(response => {
                if (response.status === 201 || response.status === 204) {
                    getSpentBudget();
                    $(`#${configMap.budgetExpense(messageRegistry).newBudgetExpenseModal.id}`).modal("hide");
                }
            })
    }, [id, date, amount, note, searchTag])

    useEffect(() => {
        loadCommonData();
        getSpentBudget();
    }, [])


    let component= <div>
        <Menu messages={configMap.budgetExpense(messageRegistry).menuMessages}
              links={links}>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <OpenPopUpMenuItem key="insertBudgetModal"
                                   callback={openSaveBudgetExpensePopUp}
                                   label={configMap.budgetExpense(messageRegistry).menuMessages.insertBudgetModal}
                                   modalId={configMap.budgetExpense(messageRegistry).newBudgetExpenseModal.id}
                                   iconClassNames="fas fa-cart-plus fa-lg"/>

                <PageNavigationMenuItem
                    menuItemLabel={configMap.budgetExpense(messageRegistry).menuMessages.searchTags}
                    link="/search-tags"
                    menuItemPrefixIcon="fas fa-tags fa-lg"/>
            </ul>


            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="badge badge-info nav-item active total-box">
                    <h6>Total: <span>{spentBudget.total || 0.00}</span></h6>
                </li>
                <li className="nav-item active">
                    <SelectMonthlySpentBudget action={links.home}
                                              name="selectMonthlySpentBudget"
                                              monthRegistry={monthRegistry}
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

                <CreateNewBudgetExpensePopup spentBudgetHandlers={savePopupEventHandlers}
                                             budgetExpense={{
                                                 id: id,
                                                 date: date,
                                                 amount: amount,
                                                 note: note,
                                                 searchTag: searchTag
                                             }}
                                             saveCallback={saveExpense}
                                             searchTagRegistry={searchTagRegistry}
                                             modal={configMap.budgetExpense(messageRegistry).newBudgetExpenseModal}/>

                <DeleteBudgetExpenseConfirmationPopUp deleteBudgetExpenseAction={deleteItem}
                                                      modal={configMap.budgetExpense(messageRegistry).deleteModal}/>


                <div className="row">
                    <div className="col-12 col-md-9">
                        <ContentCard
                            header={configMap.budgetExpense(messageRegistry).cards.dailyDetails}>
                            <SpentBudgetContent spentBudget={spentBudget}
                                                searchTagRegistry={searchTagRegistry}
                                                openUpdateBudgetExpensePopUp={openUpdateBudgetExpensePopUp}
                                                openDeleteBudgetExpensePopUp={openDeleteBudgetExpensePopUp}/>
                        </ContentCard>
                    </div>

                    <div className="col-12 col-md-3">
                        <ContentCard
                            header={configMap.budgetExpense(messageRegistry).cards.totalByCategories}>
                            <TotalBySearchTags totals={spentBudget.totalDetailList || []}/>
                        </ContentCard>
                    </div>
                </div>
            </div>
        </div>
    </div>

    let theme = themeProvider

    let menu = (<Menu messages={configMap.budgetExpense(messageRegistry).menuMessages}
                      links={links}>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <OpenPopUpMenuItem key="insertBudgetModal"
                               callback={openSaveBudgetExpensePopUp}
                               label={configMap.budgetExpense(messageRegistry).menuMessages.insertBudgetModal}
                               modalId={configMap.budgetExpense(messageRegistry).newBudgetExpenseModal.id}
                               iconClassNames="fas fa-cart-plus fa-lg"/>

            <PageNavigationMenuItem
                menuItemLabel={configMap.budgetExpense(messageRegistry).menuMessages.searchTags}
                link="/search-tags"
                menuItemPrefixIcon="fas fa-tags fa-lg"/>
        </ul>


        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="badge badge-info nav-item active total-box">
                <h6>Total: <span>{spentBudget.total || 0.00}</span></h6>
            </li>
            <li className="nav-item active">
                <SelectMonthlySpentBudget action={links.home}
                                          name="selectMonthlySpentBudget"
                                          monthRegistry={monthRegistry}
                                          month={getMonth()}
                                          year={getYear()}/>
            </li>
            <PageNavigationMenuItem menuItemLabel="Revenue"
                                    link="/budget-revenue"
                                    menuItemPrefixIcon="fas fa-money-bill-wave fa-lg"/>
        </ul>
    </Menu>)

    return <ThemeProvider theme={theme}>
        <Paper variant="outlined">
            <Menu messages={configMap.searchTags(messageRegistry).menuMessages} links={links}>
                <AccountPageMenuItem text={configMap.searchTags(messageRegistry).menuMessages.userProfileLabel}/>
                <SearchTagsPageMenuItem text={configMap.searchTags(messageRegistry).menuMessages.searchTags}/>
                <BudgetRevenuePageMenuItem text="Revenue"/>
                <AccountPageMenuItem text={configMap.searchTags(messageRegistry).menuMessages.userProfileLabel}/>
            </Menu>

            <Container>
            </Container>
        </Paper>
    </ThemeProvider>
}
export default BudgetExpensePage
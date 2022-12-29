import React, {useCallback, useEffect, useState} from 'react'
import {getMonth, getSearchTags, getYear} from "../../domain/model/SearchCriteriaOnUrl";
import {
    deleteBudgetExpense,
    findBudgetExpense,
    saveBudgetExpense
} from "../../domain/repository/BudgetExpenseRepository";
import moment from "moment";
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import {getMonthRegistry} from "../../domain/repository/MonthRepository";
import {getSearchTagRegistry} from "../../domain/repository/SearchTagRepository";
import {Container, Paper, ThemeProvider} from "@mui/material";
import themeProvider from "../../theme/ThemeProvider";
import CreateNewBudgetExpensePopUp from "../spent-budget/popup/CreateNewBudgetExpensePopUp";
import {LocalGroceryStore} from "@mui/icons-material";
import SpentBudgetContent from "../spent-budget/budget/SpentBudgetContent";
import DeleteBudgetExpenseConfirmationPopUp from "../spent-budget/popup/DeleteBudgetExpenseConfirmationPopUp";
import {SearchTagsPageMenuItem} from "../../component/menu/SearchTagsPageMenuItem";
import {BudgetRevenuePageMenuItem} from "../../component/menu/BudgetRevenuePageMenuItem";
import AccountPageMenuItem from "../../component/menu/AccountPageMenuItem";
import OpenPopUpMenuItem from "../../component/menu/OpenPopUpMenuItem";
import Menu from "../../component/menu/Menu";

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

    const [openSaveBudgetExpensePopUp, setOpenSaveBudgetExpensePopUp] = useState(false)
    const [openDeleteBudgetExpensePopUp, setOpenDeleteBudgetExpensePopUp] = useState(false)
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

    const makeDeleteBudgetExpensePopUpOpen = useCallback((dailyBudgetExpense) => {
        setOpenDeleteBudgetExpensePopUp(true)
        setDeletableItem(dailyBudgetExpense)
    }, [])

    const deleteItem = useCallback(() => {
        deleteBudgetExpense(deletableItem.id)
            .then((response) => {
                if (response.status === 204) {
                    getSpentBudget();
                    setOpenDeleteBudgetExpensePopUp(false)
                }
            })
    }, [deletableItem])

    const savePopupEventHandlers = {
        date: (value) => {
            let date = moment();
            try {
                date = value.format(DateFormatPattern);
            } catch (e) {
            }
            setDate(date)
        },
        amount: (event) => {
            setAmount(event.target.value)
        },
        searchTag: (searchTag) => {
            setSearchTag(searchTag)
        },
        note: (event) => setNote(event.target.value)
    }

    const saveBudgetExpensePopUpCloseHandler = useCallback(() => {
        setId("")
        setDate(moment())
        setAmount("0.00")
        setNote("")
        setSearchTag("")
        setOpenSaveBudgetExpensePopUp(false)
    }, [])

    const deleteBudgetExpensePopUpCloseHandler = useCallback(() => {
        setDeletableItem({})
        setOpenDeleteBudgetExpensePopUp(false)
    }, [])

    const makeSaveBudgetExpensePopUpOpen = useCallback(() => {
        setId("")
        setDate(moment())
        setAmount("0.00")
        setNote("")
        setSearchTag("")
        setOpenSaveBudgetExpensePopUp(true)
    }, [])

    const openUpdateBudgetExpensePopUp = useCallback((expense) => {
        setId(expense.id)
        setDate(moment(expense.date, "DD/MM/YYYY"))
        setAmount(expense.amount)
        setNote(expense.note)
        setSearchTag(expense.searchTag)
        setOpenSaveBudgetExpensePopUp(true)
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
                    setOpenSaveBudgetExpensePopUp(false)
                }
            })
    }, [id, date, amount, note, searchTag])

    useEffect(() => {
        loadCommonData();
        getSpentBudget();
    }, [])

    let theme = themeProvider

    return <ThemeProvider theme={theme}>
        <Paper variant="outlined">
            <CreateNewBudgetExpensePopUp
                open={openSaveBudgetExpensePopUp}
                handleClose={saveBudgetExpensePopUpCloseHandler}
                spentBudgetHandlers={savePopupEventHandlers}
                budgetExpense={{
                    id: id,
                    date: date,
                    amount: amount,
                    note: note,
                    searchTag: searchTag
                }}
                saveCallback={saveExpense}
                searchTagRegistry={searchTagRegistry}
                modal={configMap.budgetExpense(messageRegistry).newBudgetExpenseModal}
            />

            <DeleteBudgetExpenseConfirmationPopUp deleteBudgetExpenseAction={deleteItem}
                                                  open={openDeleteBudgetExpensePopUp}
                                                  handleClose={deleteBudgetExpensePopUpCloseHandler}
                                                  modal={configMap.budgetExpense(messageRegistry).deleteModal}/>

            <Menu messages={configMap.searchTags(messageRegistry).menuMessages} links={links}>
                <OpenPopUpMenuItem icon={<LocalGroceryStore/>}
                                     openPopupHandler={makeSaveBudgetExpensePopUpOpen}
                                     text={configMap.budgetExpense(messageRegistry).menuMessages.insertBudgetModal}/>
                <SearchTagsPageMenuItem text={configMap.budgetExpense(messageRegistry).menuMessages.searchTags}/>
                <BudgetRevenuePageMenuItem text="Revenue"/>
                <AccountPageMenuItem text={configMap.budgetExpense(messageRegistry).menuMessages.userProfileLabel}/>
            </Menu>

            <Container>
                <SpentBudgetContent spentBudget={spentBudget}
                                    searchTagRegistry={searchTagRegistry}
                                    openUpdateBudgetExpensePopUp={openUpdateBudgetExpensePopUp}
                                    openDeleteBudgetExpensePopUp={makeDeleteBudgetExpensePopUpOpen}/>
            </Container>
        </Paper>
    </ThemeProvider>
}
export default BudgetExpensePage
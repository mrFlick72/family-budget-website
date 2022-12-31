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
import {Container, Paper, Tab, Tabs, ThemeProvider} from "@mui/material";
import themeProvider from "../../theme/ThemeProvider";
import CreateNewBudgetExpensePopUp from "../spent-budget/popup/CreateNewBudgetExpensePopUp";
import {LocalGroceryStore, Search} from "@mui/icons-material";
import SpentBudgetContent from "../spent-budget/budget/SpentBudgetContent";
import DeleteBudgetExpenseConfirmationPopUp from "../spent-budget/popup/DeleteBudgetExpenseConfirmationPopUp";
import {SearchTagsPageMenuItem} from "../../component/menu/SearchTagsPageMenuItem";
import {BudgetRevenuePageMenuItem} from "../../component/menu/BudgetRevenuePageMenuItem";
import AccountPageMenuItem from "../../component/menu/AccountPageMenuItem";
import OpenPopUpMenuItem from "../../component/menu/OpenPopUpMenuItem";
import Menu from "../../component/menu/Menu";
import {TabPanel} from "../../component/layout/TabPanel";
import TotalBySearchTags from "../spent-budget/budget/TotalBySearchTags";
import SpentBudgetTotalBanner from "../spent-budget/budget/SpentBudgetTotalBanner";
import {DateFormatPattern} from "../../component/form/FormDatePicker";
import SearchBudgetExpensePopUp from "../spent-budget/popup/SearchBudgetExpensePopUp";

const BudgetExpensePage = (props) => {
    const {messageRegistry, links} = props
    const [tabPanel, setTabPanel] = React.useState(0);


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
    const [openSearchBudgetExpensePopUp, setOpenSearchBudgetExpensePopUp] = useState(false)

    const [selectedMonth, setSelectedMonth] = useState(getMonth())
    const [selectedYear, setSelectedYear] = useState(getYear())
    const [selectedSearchTags, setSelectedSearchTags] = useState([])

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

    const makeSearchBudgetExpensePopUpOpen = useCallback(() => {
        setOpenSearchBudgetExpensePopUp(true)
    }, [])

    const searchBudgetExpensePopUpCloseHandler = useCallback(() => {
        setOpenSearchBudgetExpensePopUp(false)
    }, [])

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
    const searchPopupEventHandlers = {
        searchTag: (searchTag) => {
            setSelectedSearchTags(searchTag)
        },
        month: (event) => setSelectedMonth(event.target.value),
        year: (event) => setSelectedYear(event.target.value)
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

    const handleTabPanelChange = (event, newValue) => {
        setTabPanel(newValue);
    };

    let navBarItems = [
        <SpentBudgetTotalBanner total={spentBudget.total}/>
    ];

    return <ThemeProvider theme={theme}>
        <Paper variant="outlined">
            <SearchBudgetExpensePopUp
                monthRegistry={monthRegistry}
                searchTagRegistry={searchTagRegistry}
                handlers={searchPopupEventHandlers}
                modal={configMap.budgetExpense(messageRegistry).searchFilterModal}
                handleClose={searchBudgetExpensePopUpCloseHandler}
                open={openSearchBudgetExpensePopUp}
                saveCallback={() => {
                    window.location.href = `${links.home}?choicedMonth=${selectedMonth}&year=${selectedYear}`;
                }}
            />

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

            <Menu messages={configMap.searchTags(messageRegistry).menuMessages}
                  links={links}
                  navBarItems={navBarItems}>

                <OpenPopUpMenuItem icon={<LocalGroceryStore/>}
                                   openPopupHandler={makeSaveBudgetExpensePopUpOpen}
                                   text={configMap.budgetExpense(messageRegistry).menuMessages.insertBudgetModal}/>

                <OpenPopUpMenuItem icon={<Search/>}
                                   openPopupHandler={makeSearchBudgetExpensePopUpOpen}
                                   text="Search"/>

                <SearchTagsPageMenuItem text={configMap.budgetExpense(messageRegistry).menuMessages.searchTags}/>
                <BudgetRevenuePageMenuItem text="Revenue"/>
                <AccountPageMenuItem text={configMap.budgetExpense(messageRegistry).menuMessages.userProfileLabel}/>
            </Menu>

            <Container>
                <Tabs
                    value={tabPanel}
                    onChange={handleTabPanelChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value={0} label="Budget Expense Daily View"/>
                    <Tab value={1} label="Budget Expense By Tags View"/>
                </Tabs>
                <TabPanel value={tabPanel} index={0}>
                    <SpentBudgetContent spentBudget={spentBudget}
                                        searchTagRegistry={searchTagRegistry}
                                        openUpdateBudgetExpensePopUp={openUpdateBudgetExpensePopUp}
                                        openDeleteBudgetExpensePopUp={makeDeleteBudgetExpensePopUpOpen}/> </TabPanel>
                <TabPanel value={tabPanel} index={1}>
                    <TotalBySearchTags totals={spentBudget.totalDetailList || []}/>
                </TabPanel>
            </Container>
        </Paper>
    </ThemeProvider>
}
export default BudgetExpensePage
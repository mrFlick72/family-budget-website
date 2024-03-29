import React, {useCallback, useEffect, useState} from 'react'
import {
    getMonthSearchCriteria,
    getSearchTagsSearchCriteria,
    getYearSearchCriteria,
    setMonthSearchCriteria,
    setSearchTagsSearchCriteria,
    setYearSearchCriteria
} from "../SearchCriteriaOnUrl";
import {deleteBudgetExpense, findBudgetExpense, saveBudgetExpense} from "./BudgetExpenseRepository";
import moment from "moment";
import {FamilyBudgetPagesConfigMap} from "../messages/FamilyBudgetPagesConfigMap";
import {getMonthRegistry} from "../time/MonthRepository";
import {getSearchTagRegistry} from "../search-tags/SearchTagRepository";
import {Container, Paper, Tab, Tabs, ThemeProvider} from "@mui/material";
import themeProvider from "../theme/ThemeProvider";
import SaveBudgetExpensePopUp from "./popup/SaveBudgetExpensePopUp";
import {LocalGroceryStore, Search} from "@mui/icons-material";
import SpentBudgetContent from "./budget/SpentBudgetContent";
import DeleteBudgetExpenseConfirmationPopUp from "./popup/DeleteBudgetExpenseConfirmationPopUp";
import {SearchTagsPageMenuItem} from "../component/menu/SearchTagsPageMenuItem";
import {BudgetRevenuePageMenuItem} from "../component/menu/BudgetRevenuePageMenuItem";
import AccountPageMenuItem from "../component/menu/AccountPageMenuItem";
import OpenPopUpMenuItem from "../component/menu/OpenPopUpMenuItem";
import Menu from "../component/menu/Menu";
import {TabPanel} from "../component/layout/TabPanel";
import TotalBySearchTags from "./budget/TotalBySearchTags";
import SpentBudgetTotalBanner from "./budget/SpentBudgetTotalBanner";
import {DateFormatPattern} from "../component/form/FormDatePicker";
import SearchBudgetExpensePopUp from "./popup/SearchBudgetExpensePopUp";

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
    const makeNewBudgetExpensePopUpOpen = useCallback(() => {
        setId("")
        setDate(moment())
        setAmount("0.00")
        setNote("")
        setSearchTag("")
        setOpenSaveBudgetExpensePopUp(true)
    }, [])
    const makeUpdateBudgetExpensePopUpOpen = useCallback((expense) => {
        setId(expense.id)
        setDate(moment(expense.date, DateFormatPattern))
        setAmount(expense.amount)
        setNote(expense.note)
        setSearchTag(expense.searchTag)
        setOpenSaveBudgetExpensePopUp(true)
    }, [])
    const saveBudgetExpensePopUpCloseHandler = useCallback(() => {
        setOpenSaveBudgetExpensePopUp(false)
    }, [])


    const [openDeleteBudgetExpensePopUp, setOpenDeleteBudgetExpensePopUp] = useState(false)
    const makeDeleteBudgetExpensePopUpOpen = useCallback((dailyBudgetExpense) => {
        setOpenDeleteBudgetExpensePopUp(true)
        setDeletableItem(dailyBudgetExpense)
    }, [])
    const deleteBudgetExpensePopUpCloseHandler = useCallback(() => {
        setDeletableItem({})
        setOpenDeleteBudgetExpensePopUp(false)
    }, [])

    const [openSearchBudgetExpensePopUp, setOpenSearchBudgetExpensePopUp] = useState(false)
    const makeSearchBudgetExpensePopUpOpen = useCallback(() => {
        setOpenSearchBudgetExpensePopUp(true)
    }, [])
    const searchBudgetExpensePopUpCloseHandler = useCallback(() => {
        setOpenSearchBudgetExpensePopUp(false)
    }, [])

    const [selectedMonth, setSelectedMonth] = useState(getMonthSearchCriteria())
    const [selectedYear, setSelectedYear] = useState(getYearSearchCriteria())
    const [selectedSearchTags, setSelectedSearchTags] = useState([])

    const configMap = new FamilyBudgetPagesConfigMap();

    function getSpentBudget() {
        findBudgetExpense({
            month: getMonthSearchCriteria(),
            year: getYearSearchCriteria(),
            searchTagList: getSearchTagsSearchCriteria()
        }).then(data => {
            setSpentBudget(data)
        });
    }

    function loadCommonData() {
        getMonthRegistry().then(data => setMonthRegistry(data));
        getSearchTagRegistry().then(data => setSearchTagRegistry(data));
    }


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
                date = moment(value, DateFormatPattern);
            } catch (e) {
                console.log(e)
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
        month: (event) => {
            setSelectedMonth(event.value)
        },
        year: (event) => {
            setSelectedYear(event.target.value)
        }
    }

    const saveExpense = useCallback(() => {
        let budgetExpense = {
            id: id,
            date: date.format(DateFormatPattern),
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
        }, []
    )

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
                month={selectedMonth}
                year={selectedYear}
                searchTags={selectedSearchTags}
                monthRegistry={monthRegistry}
                searchTagRegistry={searchTagRegistry}
                handlers={searchPopupEventHandlers}
                modal={configMap.budgetExpense(messageRegistry).searchFilterModal}
                handleClose={searchBudgetExpensePopUpCloseHandler}
                open={openSearchBudgetExpensePopUp}
                saveCallback={() => {
                    setMonthSearchCriteria(selectedMonth)
                    setYearSearchCriteria(selectedYear)
                    setSearchTagsSearchCriteria(selectedSearchTags.map(tag => tag.value))
                    setOpenSearchBudgetExpensePopUp(false)
                    getSpentBudget()
                }}
            />

            <SaveBudgetExpensePopUp
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
                                   openPopupHandler={makeNewBudgetExpensePopUpOpen}
                                   text={configMap.budgetExpense(messageRegistry).menuMessages.insertBudgetModal}/>

                <OpenPopUpMenuItem icon={<Search/>}
                                   openPopupHandler={makeSearchBudgetExpensePopUpOpen}
                                   text="Search"/>

                <SearchTagsPageMenuItem text={configMap.budgetExpense(messageRegistry).menuMessages.searchTags}/>
                <BudgetRevenuePageMenuItem text="Revenue"/>
                <AccountPageMenuItem text={configMap.budgetExpense(messageRegistry).menuMessages.userProfileLabel}/>
            </Menu>

            <Container>
                <Tabs value={tabPanel}
                      onChange={handleTabPanelChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      aria-label="secondary tabs example">
                    <Tab value={0} label="Daily View"/>
                    <Tab value={1} label="By Tags View"/>
                </Tabs>
                <TabPanel value={tabPanel} index={0}>
                    <SpentBudgetContent spentBudget={spentBudget}
                                        searchTagRegistry={searchTagRegistry}
                                        openUpdateBudgetExpensePopUp={makeUpdateBudgetExpensePopUpOpen}
                                        openDeleteBudgetExpensePopUp={makeDeleteBudgetExpensePopUpOpen}/>
                </TabPanel>
                <TabPanel value={tabPanel} index={1}>
                    <TotalBySearchTags totals={spentBudget.totalDetailList || []}/>
                </TabPanel>
            </Container>
        </Paper>
    </ThemeProvider>
}
export default BudgetExpensePage
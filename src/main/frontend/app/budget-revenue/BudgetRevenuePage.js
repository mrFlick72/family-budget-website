import React, {useCallback, useEffect, useState} from "react"
import Menu from "../component/menu/Menu";
import OpenPopUpMenuItem from "../component/menu/OpenPopUpMenuItem";
import BudgetRevenueForm from "./BudgetRevenueForm";
import moment from "moment";
import {FamilyBudgetPagesConfigMap} from "../messages/FamilyBudgetPagesConfigMap";
import * as searchCriteria from "../SearchCriteriaOnUrl";
import {
    deleteBudgetRevenue,
    findBudgetRevenue,
    saveBudgetRevenue
} from "./BudgetRevenueRepository";
import themeProvider from "../theme/ThemeProvider";
import {Container, Paper, ThemeProvider} from "@mui/material";
import {Money} from "@mui/icons-material";
import BudgetRevenueContent from "./BudgetRevenueContent";
import DeleteBudgetRevenueConfirmationPopUp from "./DeleteBudgetRevenueConfirmationPopUp";
import SaveBudgetRevenuePopUp from "./SaveBudgetRevenuePopUp";

const BudgetRevenuePage = ({messageRegistry, links}) => {

    const [deletableItem, setDeletableItem] = useState({})
    const [revenues, setRevenues] = useState([])
    const [currentBudgetRevenueId, setCurrentBudgetRevenueId] = useState("")
    const [currentBudgetRevenueDate, setCurrentBudgetRevenueDate] = useState(moment())
    const [currentBudgetRevenueAmount, setCurrentBudgetRevenueAmount] = useState("0.00")
    const [currentBudgetRevenueNote, setCurrentBudgetRevenueNote] = useState("")

    const [openSaveBudgetRevenuePopUp, setOpenSaveBudgetRevenuePopUp] = useState(false)
    const makeSaveBudgetRevenuePopUpOpen = useCallback(() => {
        setCurrentBudgetRevenueId("")
        setCurrentBudgetRevenueDate(moment())
        setCurrentBudgetRevenueAmount("0.00")
        setCurrentBudgetRevenueNote("")
        setOpenSaveBudgetRevenuePopUp(true)
    }, [])
    const saveBudgetRevenuePopUpCloseHandler = useCallback(() => {
        setOpenSaveBudgetRevenuePopUp(false)
    }, [])

    const [openUpdateBudgetRevenuePopUp, setOpenUpdateBudgetRevenuePopUp] = useState(false)
    const makeUpdateBudgetRevenuePopUpOpen = useCallback((revenue) => {
        setCurrentBudgetRevenueId(revenue.id)
        setCurrentBudgetRevenueDate(moment(revenue.date, "DD/MM/YYYY"))
        setCurrentBudgetRevenueAmount(revenue.amount)
        setCurrentBudgetRevenueNote(revenue.note)
        setOpenUpdateBudgetRevenuePopUp(true)
    }, [])
    const updateBudgetRevenuePopUpCloseHandler = useCallback(() => {
        setOpenUpdateBudgetRevenuePopUp(false)
    }, [])

    const [openDeleteBudgetRevenuePopUp, setOpenDeleteBudgetRevenuePopUp] = useState(false)
    const makeDeleteBudgetRevenuePopUpOpen = useCallback((revenue) => {
        setDeletableItem(revenue)
        setOpenDeleteBudgetRevenuePopUp(true)
    }, [])
    const deleteBudgetRevenuePopUpOpenCloseHandler = useCallback(() => {
        setOpenDeleteBudgetRevenuePopUp(false)
    }, [])

    let configMap = new FamilyBudgetPagesConfigMap()
    useEffect(() => budgetRevenue(), [])

    const budgetRevenue = () => {
        findBudgetRevenue(searchCriteria.getYear())
            .then(revenues => setRevenues(revenues))
    }

    const budgetRevenueHandlers = {
        date: (value) => setCurrentBudgetRevenueDate(value),
        amount: (event) => setCurrentBudgetRevenueAmount(event.target.value),
        note: (event) => setCurrentBudgetRevenueNote(event.target.value)
    }

    const deleteItem = useCallback(() => {
        deleteBudgetRevenue(deletableItem.id)
            .then((response) => {
                if (response.status === 204) {
                    budgetRevenue()
                    setOpenDeleteBudgetRevenuePopUp(false)
                }
            })
    }, [deletableItem])

    const saveRevenue = useCallback(() => {
        saveBudgetRevenue({
            id: currentBudgetRevenueId,
            date: currentBudgetRevenueDate.format("DD/MM/YYYY"),
            amount: currentBudgetRevenueAmount,
            note: currentBudgetRevenueNote
        }).then(response => {
            if (response.status === 201 || response.status === 204) {
                setOpenSaveBudgetRevenuePopUp(false)
                setOpenUpdateBudgetRevenuePopUp(false)
                budgetRevenue()
            }
        })
    }, [currentBudgetRevenueId, currentBudgetRevenueDate, currentBudgetRevenueAmount, currentBudgetRevenueNote])

    let budgetRevenueForm = <BudgetRevenueForm budgetRevenueData={{
        date: currentBudgetRevenueDate,
        amount: currentBudgetRevenueAmount,
        note: currentBudgetRevenueNote
    }} budgetRevenueHandlers={budgetRevenueHandlers}/>;

    let theme = themeProvider


    let deleteConfirmationPopupMessages = {
        id: "deleteBudgetRevenueModal",
        title: "Delete Budget Revenue",
        message: "Are you sure of delete the Budget Revenue from the list?"
    };
    return <ThemeProvider theme={theme}>
        <Paper variant="outlined">

            <Menu messages={configMap.budgetRevenue(messageRegistry).menuMessages} links={links}>

                <OpenPopUpMenuItem icon={<Money/>}
                                   openPopupHandler={makeSaveBudgetRevenuePopUpOpen}
                                   text={configMap.budgetExpense(messageRegistry).menuMessages.insertBudgetModal}/>

            </Menu>
            <Container>
                <SaveBudgetRevenuePopUp
                    open={openSaveBudgetRevenuePopUp}
                    handleClose={saveBudgetRevenuePopUpCloseHandler}
                    modal={configMap.budgetRevenue(messageRegistry).saveBudgetRevenueModal}
                    form={budgetRevenueForm}
                    saveCallback={saveRevenue}/>

                <SaveBudgetRevenuePopUp
                    open={openUpdateBudgetRevenuePopUp}
                    handleClose={updateBudgetRevenuePopUpCloseHandler}
                    modal={configMap.budgetRevenue(messageRegistry).saveBudgetRevenueModal}
                    form={budgetRevenueForm}
                    saveCallback={saveRevenue}/>

                <DeleteBudgetRevenueConfirmationPopUp
                    open={openDeleteBudgetRevenuePopUp}
                    handleClose={deleteBudgetRevenuePopUpOpenCloseHandler}
                    modal={deleteConfirmationPopupMessages}
                    saveCallback={deleteItem}/>

                <BudgetRevenueContent openUpdatePopUp={makeUpdateBudgetRevenuePopUpOpen}
                                      openDeletePopUp={makeDeleteBudgetRevenuePopUpOpen}
                                      revenues={revenues}/>
            </Container>

        </Paper>
    </ThemeProvider>

}

export default BudgetRevenuePage
import React, {useCallback, useEffect, useState} from "react"
import Menu from "../../component/menu/Menu";
import OpenPopUpMenuItem from "../../component/menu/OpenPopUpMenuItem";
import BudgetRevenueForm from "../budget-revenue/BudgetRevenueForm";
import moment from "moment";
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import * as searchCriteria from "../../domain/model/SearchCriteriaOnUrl";
import {
    deleteBudgetRevenue,
    findBudgetRevenue,
    saveBudgetRevenue
} from "../../domain/repository/BudgetRevenueRepository";
import themeProvider from "../../theme/ThemeProvider";
import {Container, Paper, ThemeProvider} from "@mui/material";
import {Money} from "@mui/icons-material";
import BudgetRevenueContent from "../budget-revenue/BudgetRevenueContent";
import DeleteBudgetRevenueConfirmationPopUp from "../budget-revenue/DeleteBudgetRevenueConfirmationPopUp";

const BudgetRevenuePage = ({messageRegistry, links}) => {

    const [deletableItem, setDeletableItem] = useState({})
    const [revenues, setRevenues] = useState([])
    const [currentBudgetRevenueId, setCurrentBudgetRevenueId] = useState("")
    const [currentBudgetRevenueDate, setCurrentBudgetRevenueDate] = useState(moment())
    const [currentBudgetRevenueAmount, setCurrentBudgetRevenueAmount] = useState("0.00")
    const [currentBudgetRevenueNote, setCurrentBudgetRevenueNote] = useState("")

    const [openSaveBudgetRevenuePopUpOpen, setOpenSaveBudgetRevenuePopUpOpen] = useState(false)
    const makeOpenSaveBudgetRevenuePopUpOpen = useCallback(() => {
        setOpenSaveBudgetRevenuePopUpOpen(true)
    }, [])
    const saveBudgetRevenuePopUpOpenCloseHandler = useCallback(() => {
        setOpenSaveBudgetRevenuePopUpOpen(false)
    }, [])

    const [openDeleteBudgetRevenuePopUpOpen, setOpenDeleteBudgetRevenuePopUpOpen] = useState(false)
    const makeOpenDeleteBudgetRevenuePopUpOpen = useCallback(() => {
        setOpenSaveBudgetRevenuePopUpOpen(true)
    }, [])
    const deleteBudgetRevenuePopUpOpenCloseHandler = useCallback(() => {
        setOpenSaveBudgetRevenuePopUpOpen(false)
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
    const openSaveBudgetRevenuePopUp = useCallback(() => {
        setCurrentBudgetRevenueId("")
        setCurrentBudgetRevenueDate(moment())
        setCurrentBudgetRevenueAmount("0.00")
        setCurrentBudgetRevenueNote("")
        $(`#${configMap.budgetRevenue(messageRegistry).saveBudgetRevenueModal.id}`).modal("show");
    }, [])

    const openDeleteBudgetRevenuePopUp = useCallback((revenue) => {
        setDeletableItem(revenue)
        $(`#${configMap.budgetRevenue(messageRegistry).deleteModal.id}`).modal("show");
    }, [])

    const openUpdateBudgetRevenuePopUp = useCallback((revenue) => {
        setCurrentBudgetRevenueId(revenue.id)
        setCurrentBudgetRevenueDate(moment(revenue.date, "DD/MM/YYYY"))
        setCurrentBudgetRevenueAmount(revenue.amount)
        setCurrentBudgetRevenueNote(revenue.note)
        makeOpenSaveBudgetRevenuePopUpOpen()
    }, [])

    const deleteItem = useCallback(() => {
        deleteBudgetRevenue(deletableItem.id)
            .then((response) => {
                if (response.status === 204) {
                    $(`#${configMap.budgetRevenue(messageRegistry).deleteModal.id}`).modal("hide");
                    budgetRevenue()
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
                $(`#${configMap.budgetRevenue(messageRegistry).saveBudgetRevenueModal.id}`).modal("hide");
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
                                   openPopupHandler={makeOpenSaveBudgetRevenuePopUpOpen}
                                   text={configMap.budgetExpense(messageRegistry).menuMessages.insertBudgetModal}/>

            </Menu>
            <Container>
                {/*        <PopupContainer
                    modal={configMap.budgetRevenue(messageRegistry).saveBudgetRevenueModal}
                    form={budgetRevenueForm}
                    saveFun={saveRevenue}/>*/}

                <DeleteBudgetRevenueConfirmationPopUp
                    open={openDeleteBudgetRevenuePopUpOpen}
                    handleClose={delteBudgetRevenuePopUpOpenCloseHandler}
                    modal={deleteConfirmationPopupMessages}
                    confirmationHandler={deleteItem}/>

                <BudgetRevenueContent openUpdatePopUp={openUpdateBudgetRevenuePopUp}
                                      openDeletePopUp={openDeleteBudgetRevenuePopUp}
                                      revenues={revenues}/>
            </Container>

        </Paper>
    </ThemeProvider>

}

export default BudgetRevenuePage
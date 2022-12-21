import React, {useEffect, useState} from "react"
import Menu from "../../component/menu/Menu";
import BudgetRevenueContent from "../budget-revenue/BudgetRevenueContent";
import OpenPopUpMenuItem from "../../component/menu/OpenPopUpMenuItem";
import BudgetRevenueForm from "../budget-revenue/BudgetRevenueForm";
import PopupContainer from "../../component/layout/PopupContainer";
import moment from "moment";
import ConfirmationPopUp from "../../component/layout/ConfirmationPopUp";
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";
import * as searchCriteria from "../../domain/model/SearchCriteriaOnUrl";
import {
    deleteBudgetRevenue,
    findBudgetRevenue,
    saveBudgetRevenue
} from "../../domain/repository/BudgetRevenueRepository";

const BudgetRevenuePage = (props) => {

    const [deletableItem, setDeletableItem] = useState({})
    const [revenues, setRevenues] = useState([])
    const [currentBudgetRevenueId, setCurrentBudgetRevenueId] = useState("")
    const [currentBudgetRevenueDate, setCurrentBudgetRevenueDate] = useState(moment())
    const [currentBudgetRevenueAmount, setCurrentBudgetRevenueAmount] = useState("0.00")
    const [currentBudgetRevenueNote, setCurrentBudgetRevenueNote] = useState("")

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
    const openSaveBudgetRevenuePopUp = () => {
        setCurrentBudgetRevenueId("")
        setCurrentBudgetRevenueDate(moment())
        setCurrentBudgetRevenueAmount("0.00")
        setCurrentBudgetRevenueNote("")
        $(`#${configMap.budgetRevenue(props.messageRegistry).saveBudgetRevenueModal.id}`).modal("show");
    }

    const openDeleteBudgetRevenuePopUp = (revenue) => {
        setDeletableItem(revenue)
        $(`#${configMap.budgetRevenue(props.messageRegistry).deleteModal.id}`).modal("show");
    }

    const openUpdateBudgetRevenuePopUp = (revenue) => {
        setCurrentBudgetRevenueId(revenue.id)
        setCurrentBudgetRevenueDate(moment(revenue.date, "DD/MM/YYYY"))
        setCurrentBudgetRevenueAmount(revenue.amount)
        setCurrentBudgetRevenueNote(revenue.note)
        $(`#${configMap.budgetRevenue(props.messageRegistry).saveBudgetRevenueModal.id}`).modal("show");
    }

    const deleteItem = () => {
        deleteBudgetRevenue(deletableItem.id)
            .then((response) => {
                if (response.status === 204) {
                    $(`#${configMap.budgetRevenue(props.messageRegistry).deleteModal.id}`).modal("hide");
                    budgetRevenue()
                }
            })
    }

    const saveRevenue = () => {
        saveBudgetRevenue({
            id: currentBudgetRevenueId,
            date: currentBudgetRevenueDate.format("DD/MM/YYYY"),
            amount: currentBudgetRevenueAmount,
            note: currentBudgetRevenueNote
        }).then(response => {
            if (response.status === 201 || response.status === 204) {
                $(`#${configMap.budgetRevenue(props.messageRegistry).saveBudgetRevenueModal.id}`).modal("hide");
                budgetRevenue()
            }
        })
    }

    let budgetRevenueForm = <BudgetRevenueForm budgetRevenueData={{
        date: currentBudgetRevenueDate,
        amount: currentBudgetRevenueAmount,
        note: currentBudgetRevenueNote
    }} budgetRevenueHandlers={budgetRevenueHandlers}/>;

    return <div>
        <Menu messages={configMap.budgetRevenue(props.messageRegistry).menuMessages}
              links={props.links}>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <OpenPopUpMenuItem key="saveBudgetRevenueModal"
                                   label="New Budget Expense"
                                   modalId="saveBudgetRevenueModal"
                                   callback={openSaveBudgetRevenuePopUp}
                                   iconClassNames="fas fa-money-bill-alt fa-lg"/>
            </ul>
        </Menu>


        <div className="container-fluid">
            <div className="content">
                <PopupContainer
                    modal={configMap.budgetRevenue(props.messageRegistry).saveBudgetRevenueModal}
                    form={budgetRevenueForm}
                    saveFun={saveRevenue}/>

                <ConfirmationPopUp confirmationHandler={deleteItem}
                                   modalId="deleteBudgetRevenueModal"
                                   modalMessageBody="Are you sure of delete the Budget Revenue from the list?"
                                   modalTitle="Delete Budget Revenue"/>

                <div className="row justify-content-md-center">
                    <div className="col-8">
                        <BudgetRevenueContent openUpdatePopUp={openUpdateBudgetRevenuePopUp}
                                              openDeletePopUp={openDeleteBudgetRevenuePopUp}
                                              revenues={revenues}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default BudgetRevenuePage
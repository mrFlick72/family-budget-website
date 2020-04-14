import React from "react"
import Menu from "../../component/menu/Menu";
import BudgetRevenueContent from "../budget-revenue/BudgetRevenueContent";
import OpenPopUpMenuItem from "../../component/menu/OpenPopUpMenuItem";
import BudgetRevenueForm from "../budget-revenue/BudgetRevenueForm";
import PopupContainer from "../../component/layout/PopupContainer";
import moment from "moment";
import BudgetRevenueRepository from "../../domain/repository/BudgetRevenueRepository";
import {SearchCriteriaOnUrl} from "../../domain/model/SearchCriteriaOnUrl";
import ConfirmationPopUp from "../../component/layout/ConfirmationPopUp";
import {FamilyBudgetPagesConfigMap} from "../FamilyBudgetPagesConfigMap";

export default class BudgetRevenuePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            deletableItem: {},
            revenues: [],
            currentBudgetRevenueId: "",
            currentBudgetRevenueDate: moment(),
            currentBudgetRevenueAmount: "0.00",
            currentBudgetRevenueNote: ""
        };
        this.budgetRevenueRepository = new BudgetRevenueRepository();

        this.configMap = new FamilyBudgetPagesConfigMap()
        this.searchCriteria = new SearchCriteriaOnUrl();
        this.budgetRevenueHandlers = this.budgetRevenueHandlers.bind(this);
        this.saveBudgetRevenue = this.saveBudgetRevenue.bind(this);
    }

    componentDidMount() {
        this.budgetRevenue();
    }

    budgetRevenue() {
        this.budgetRevenueRepository.findSpentBudget(this.searchCriteria.getYear())
            .then(revenues => this.setState({revenues: revenues}))
    }

    budgetRevenueHandlers() {
        return {
            date: (value) => this.setState({currentBudgetRevenueDate: value}),
            amount: (event) => this.setState({currentBudgetRevenueAmount: event.target.value}),
            note: (event) => this.setState({currentBudgetRevenueNote: event.target.value})
        }
    }

    openSaveBudgetRevenuePopUp() {
        console.debug("openSaveBudgetRevenuePopUp")
        this.setState({
            currentBudgetRevenueId: "",
            currentBudgetRevenueDate: moment(),
            currentBudgetRevenueAmount: "0.00",
            currentBudgetRevenueNote: ""
        })
        $(`#${this.configMap.budgetRevenue(this.props.messageRegistry).saveBudgetRevenueModal.id}`).modal("show");
    }

    openDeleteBudgetRevenuePopUp(revenue) {
        console.debug("openDeleteBudgetRevenuePopUp")
        this.setState({deletableItem: revenue})
        $(`#${this.configMap.budgetRevenue(this.props.messageRegistry).deleteModal.id}`).modal("show");
    }

    openUpdateBudgetRevenuePopUp(revenue) {
        console.debug(revenue)
        this.setState({
            currentBudgetRevenueId: revenue.id,
            currentBudgetRevenueDate: moment(revenue.date, "DD/MM/YYYY"),
            currentBudgetRevenueAmount: revenue.amount,
            currentBudgetRevenueNote: revenue.note
        })

        $(`#${this.configMap.budgetRevenue(this.props.messageRegistry).saveBudgetRevenueModal.id}`).modal("show");
    }

    deleteItem() {
        this.budgetRevenueRepository.deleteBudgetRevenue(this.state.deletableItem.id)
            .then((response) => {
                if (response.status === 204) {
                    $(`#${this.configMap.budgetRevenue(this.props.messageRegistry).deleteModal.id}`).modal("hide");
                    this.budgetRevenue()
                }
            })
    }

    saveBudgetRevenue() {
        this.budgetRevenueRepository.saveBudgetRevenue({
            id: this.state.currentBudgetRevenueId,
            date: this.state.currentBudgetRevenueDate.format("DD/MM/YYYY"),
            amount: this.state.currentBudgetRevenueAmount,
            note: this.state.currentBudgetRevenueNote
        }).then(response => {
            if (response.status === 201 || response.status === 204) {
                $(`#${this.configMap.budgetRevenue(this.props.messageRegistry).saveBudgetRevenueModal.id}`).modal("hide");
                this.budgetRevenue()
            }
        })
    }

    render() {
        let budgetRevenueForm = <BudgetRevenueForm budgetRevenueData={{
            date: this.state.currentBudgetRevenueDate,
            amount: this.state.currentBudgetRevenueAmount,
            note: this.state.currentBudgetRevenueNote
        }} budgetRevenueHandlers={this.budgetRevenueHandlers()}/>;

        return <div>
            <Menu messages={this.configMap.budgetRevenue(this.props.messageRegistry).menuMessages}
                  links={this.props.links}>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <OpenPopUpMenuItem key="saveBudgetRevenueModal"
                                       label="New Budget Expense"
                                       modalId="saveBudgetRevenueModal"
                                       callback={this.openSaveBudgetRevenuePopUp.bind(this)}
                                       iconClassNames="fas fa-money-bill-alt fa-lg"/>
                </ul>
            </Menu>


            <div className="container-fluid">
                <div className="content">
                    <PopupContainer
                        modal={this.configMap.budgetRevenue(this.props.messageRegistry).saveBudgetRevenueModal}
                        form={budgetRevenueForm}
                        saveFun={this.saveBudgetRevenue}/>

                    <ConfirmationPopUp confirmationHandler={this.deleteItem.bind(this)}
                                       modalId="deleteBudgetRevenueModal"
                                       modalMessageBody="Are you sure of delete the Budget Revenue from the list?"
                                       modalTitle="Delete Budget Revenue"/>

                    <div className="row justify-content-md-center">
                        <div className="col-8">
                            <BudgetRevenueContent openUpdatePopUp={this.openUpdateBudgetRevenuePopUp.bind(this)}
                                                  openDeletePopUp={this.openDeleteBudgetRevenuePopUp.bind(this)}
                                                  revenues={this.state.revenues}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
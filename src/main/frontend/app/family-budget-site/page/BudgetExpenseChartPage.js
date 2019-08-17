import React from 'react'
import Menu from "../../component/menu/Menu";
import YearlySpentBudgetChart from "../spent-budget/chart/YearlySpentBudgetChart";
import {FamilyBudgetPagesConfigMap} from "../spent-budget/FamilyBudgetPagesConfigMap";

const BUDGET_EXPENSE_URI = (year) => `/family-budget/budget-service/budget/expense/year/${year}`;

export default class BudgetExpenseChartPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {yearlyBudgetData: []}
        this.configMap = new FamilyBudgetPagesConfigMap();

        this.getYearlyBudget = this.getYearlyBudget.bind(this)
    }

    getYearlyBudget() {
        fetch(BUDGET_EXPENSE_URI("2018"), {
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }).then((response) => {
            return response.json();
        }).then((spentBudget) => {
            console.log(spentBudget)
            let newspentBudget = spentBudget.map((item) => {
                return {
                    x: item.x,
                    y: new Number(item.y)
                }
            });
            this.setState({
                yearlyBudgetData: newspentBudget
            })
        })
    }


    componentDidMount() {
        this.getYearlyBudget();
    }

    render() {
        return <div>
            <Menu messages={this.configMap.budgetCharts(this.props.messageRegistry).menuMessages}
                  links={this.props.links}></Menu>
            <div className="container-fluid">
                <div className="content">
                    <div className="row">
                        <div className="col-6">
                            <YearlySpentBudgetChart id="chart1" data={this.state.yearlyBudgetData} height="500"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
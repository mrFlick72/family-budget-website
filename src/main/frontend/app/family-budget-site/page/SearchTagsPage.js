import React from 'react'
import Menu from "../../component/menu/Menu";
import {FamilyBudgetPagesConfigMap} from "../spent-budget/FamilyBudgetPagesConfigMap";

export default class SearchTagsPage extends React.Component {

    constructor(props) {
        super(props)
        this.configMap = new FamilyBudgetPagesConfigMap()
    }


    render() {
        return <div>
            <Menu messages={this.configMap.budgetCharts(this.props.messageRegistry).menuMessages}
                  links={this.props.links}></Menu>
            <div className="container-fluid">
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            Form
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            Content Table
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
import React from 'react'
import SpentBudgetContent from "../spent-budget/budget/SpentBudgetContent";
import Menu from "../../component/menu/Menu";
import SelectMonthlySpentBudget from "../../component/menu/SelectMonthlySpentBudget";
import OpenPopUpMenuItem from "../../component/menu/OpenPopUpMenuItem";
import {SearchCriteriaOnUrl} from "../../domain/model/SearchCriteriaOnUrl";
import ExportImportMenuItem from "../../component/menu/ExportImportMenuItem";
import {BudgetExpenseRepository} from "../../domain/repository/BudgetExpenseRepository";
import {MonthRepository} from "../../domain/repository/MonthRepository";
import {SearchTagRepository} from "../../domain/repository/SearchTagRepository";

import {from, zip as zipStatic} from 'rxjs';
import DownloadSpentBudgetAsFileUseCase from "../../domain/usecase/DownloadSpentBudgetAsFileUseCase";
import {BudgetExpenseFileFileRepository} from "../../domain/repository/BudgetExpenseFileFileRepository";
import TotalBySearchTags from "../spent-budget/menu/TotalBySearchTags";
import ContentCard from "../../component/layout/ContentCard";
import CreateNewBudgetExpensePopup from "../spent-budget/popup/CreateNewBudgetExpensePopup";
import SearchFilterPopUp from "../spent-budget/popup/SearchFilterPopUp";
import DeleteBudgetExpenseConfirmationPopUp from "../spent-budget/popup/DeleteBudgetExpenseConfirmationPopUp";
import ImportExportInCsvPopUp from "../spent-budget/popup/ImportExportInCsvPopUp";
import moment from "moment";
import AttachmentsPopUp from "../spent-budget/popup/AttachmentsPopUp";
import PageNavigationMenuItem from "../../component/menu/PageNavigationMenuItem";
import {FamilyBudgetPagesConfigMap} from "../spent-budget/FamilyBudgetPagesConfigMap";

export default class BudgetExpensePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            date: moment(),
            amount: "0.00",
            note: "",
            searchTag: "",
            attachments: [],

            spentBudget: {},
            deletableItem: {},
            searchTagRegistry: [],
            monthRegistry: []
        };

        this.attachmentFileRef = React.createRef();
        this.monthRepository = new MonthRepository();
        this.searchTagRepository = new SearchTagRepository();
        this.searchCriteriaOnUrl = new SearchCriteriaOnUrl();
        this.budgetExpenseRepository = new BudgetExpenseRepository();

        this.downloadLink = React.createRef();
        this.budgetExpenseFileFileRepository = new BudgetExpenseFileFileRepository();
        this.downloadStentBudgetAsFileUseCase = new DownloadSpentBudgetAsFileUseCase(this.budgetExpenseFileFileRepository);

        this.configMap = new FamilyBudgetPagesConfigMap();
        this.openSaveBudgetExpensePopUp = this.openSaveBudgetExpensePopUp.bind(this);
        this.saveBudgetExpense = this.saveBudgetExpense.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.savePopupEventHandlers = this.savePopupEventHandlers.bind(this);
    }

    spentBudget() {
        from(this.budgetExpenseRepository.findSpentBudget({
            month: this.searchCriteriaOnUrl.getMonth(),
            year: this.searchCriteriaOnUrl.getYear(),
            searchTags: this.searchCriteriaOnUrl.getSearchTags()
        })).subscribe(data => {
            this.setState({spentBudget: data})
        });
    }

    loadCommonData() {
        let loadMonthRegistryObservable = from(this.monthRepository.getMonthRegistry());
        let loadSearchTagRegistryObservable = from(this.searchTagRepository.getSearchTagRegistry());

        zipStatic(loadMonthRegistryObservable, loadSearchTagRegistryObservable)
            .subscribe(([monthRegistryValue, searchTagRegistryValue]) => {
                this.setState({
                    monthRegistry: monthRegistryValue,
                    searchTagRegistry: searchTagRegistryValue,
                });
            });
    }

    openDeleteBudgetExpensePopUp(dailyBudgetExpense) {
        this.setState({deletableItem: dailyBudgetExpense})
        $(`#${this.configMap.budgetExpense(this.props.messageRegistry).deleteModal.id}`).modal("show");

    }

    deleteItem() {
        this.budgetExpenseRepository.deleteBudgetExpense(this.state.deletableItem.id)
            .then((response) => {
                if (response.status === 204) {
                    this.spentBudget();
                    $(`#${this.configMap.budgetExpense(this.props.messageRegistry).deleteModal.id}`).modal("hide");
                }
            })
    }

    savePopupEventHandlers() {
        return {
            date: (value) => {
                this.setState({date: value})
            },
            amount: (event) => {
                this.setState({amount: event.target.value})
            },
            searchTag: (searchTag) => {
                this.setState({searchTag: searchTag})
            },
            note: (event) => this.setState({"note": event.target.value})
        }
    }

    openSaveBudgetExpensePopUp() {
        this.setState({
            id: "",
            date: moment(),
            amount: "0.00",
            note: "",
            searchTag: ""
        });
        $(`#${this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}`).modal("show");
    }

    openUpdateBudgetExpensePopUp(expense) {
        this.setState({
            id: expense.id,
            date: moment(expense.date, "DD/MM/YYYY"),
            amount: expense.amount,
            note: expense.note,
            searchTag: expense.searchTag
        });

        $(`#${this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}`).modal("show");
    }

    saveBudgetExpense() {
        let budgetExpense = {
            id: this.state.id,
            date: this.state.date.format("DD/MM/YYYY"),
            amount: this.state.amount,
            note: this.state.note,
            tagKey: this.state.searchTag.value
        };

        this.budgetExpenseRepository.saveBudgetExpense(budgetExpense)
            .then(response => {
                if (response.status === 201 || response.status === 204) {
                    this.spentBudget();
                    $(`#${this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}`).modal("hide");
                }
            })
    }

    downloadSpentBudgetAsFile(mediaType) {
        this.downloadStentBudgetAsFileUseCase.getFileFor({
            mediaType: mediaType,
            link: this.downloadLink.current,
            month: this.searchCriteriaOnUrl.getMonth(),
            year: this.searchCriteriaOnUrl.getYear()
        })
    }

    openAttachmentPopUp(budgetExpense) {
        this.setState({id: budgetExpense.id, attachments: budgetExpense.attachments})
        $(`#${this.configMap.budgetExpense(this.props.messageRegistry).attachmentModal.id}`).modal("show");
    }

    saveAttachment() {
        this.budgetExpenseFileFileRepository.loadBudgetExpenseAttachment(this.state.id, this.attachmentFileRef.current)
            .then(response => {
                if (response.status === 201) {
                    this.setState((state, props) => {
                            state.attachments.push(this.attachmentFileRef.current.files[0].name);
                            return {attachments: state.attachments}
                        }
                    )
                }
            })
    }

    deleteAttachment(attachmentFileName) {
        this.budgetExpenseFileFileRepository.deleteBudgetExpenseAttachment(this.state.id, attachmentFileName)
            .then(response => {
                if (response.status === 204) {
                    this.setState((state, props) => {
                        let attachemnts = state.attachments.filter(attachment => attachment !== attachmentFileName);
                        return {attachments: attachemnts}
                    })
                }
            })

    }

    closeAttachmentPopup() {
        this.spentBudget();
        $(`#${this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}`).modal("hide");
    }

    downloadAttachment(attachmentFileName) {
        this.budgetExpenseFileFileRepository.getBudgetExpenseAttachmentFile(this.state.id, attachmentFileName)
            .then(content => {
                content.content.then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = this.downloadLink.current;
                    a.href = url;
                    a.download = content.fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
            });
    }

    componentDidMount() {
        this.loadCommonData();
        this.spentBudget();
    }


    render() {
        return (
            <div>
                <Menu messages={this.configMap.budgetExpense(this.props.messageRegistry).menuMessages}
                      links={this.props.links}>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <OpenPopUpMenuItem key="insertBudgetModal"
                                           callback={this.openSaveBudgetExpensePopUp}
                                           label={this.configMap.budgetExpense(this.props.messageRegistry).menuMessages.insertBudgetModal}
                                           modalId={this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal.id}
                                           iconClassNames="fas fa-cart-plus fa-lg"/>

                        <OpenPopUpMenuItem key="searchByTagsModal"
                                           label={this.configMap.budgetExpense(this.props.messageRegistry).menuMessages.insertBudgetModal}
                                           modalId={this.configMap.budgetExpense(this.props.messageRegistry).searchFilterModal.id}
                                           iconClassNames="fas fa-search fa-lg"/>

                        <ExportImportMenuItem key="exportImportMenuItem"
                                              downloadLink={this.downloadLink}
                                              search={this.searchCriteriaOnUrl}
                                              downloadStentBudgetAsFileUseCaseCsvHandler={this.downloadSpentBudgetAsFile.bind(this, "application/csv")}
                                              downloadStentBudgetAsFileUseCasePdfHandler={this.downloadSpentBudgetAsFile.bind(this, "application/pdf")}
                                              downloadStentBudgetAsFileUseCaseXlsxHandler={this.downloadSpentBudgetAsFile.bind(this, "application/xlsx")}/>

                        <PageNavigationMenuItem menuItemLabel="Diagram Chart"
                                                link="/budget-expense/chart"
                                                menuItemPrefixIcon="fas fa-chart-area fa-lg"/>

                        <PageNavigationMenuItem menuItemLabel="Search Tags"
                                                link="/search-tags"
                                                menuItemPrefixIcon="fas fa-tags fa-lg"/>
                    </ul>


                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="badge badge-info nav-item active total-box">
                            <h6>Total: <span>{this.state.spentBudget.total || 0.00}</span></h6>
                        </li>
                        <li className="nav-item active">
                            <SelectMonthlySpentBudget action={this.props.links.home}
                                                      name="selectMonthlySpentBudget"
                                                      monthRegistry={this.state.monthRegistry}
                                                      month={this.searchCriteriaOnUrl.getMonth()}
                                                      year={this.searchCriteriaOnUrl.getYear()}/>
                        </li>
                        <PageNavigationMenuItem menuItemLabel="Revenue"
                                                link="/budget-revenue"
                                                menuItemPrefixIcon="fas fa-money-bill-wave fa-lg"/>
                    </ul>
                </Menu>
                <div className="container-fluid">
                    <div className="content">
                        <ImportExportInCsvPopUp
                            modal={this.configMap.budgetExpense(this.props.messageRegistry).loadCsvFile}/>
                        <CreateNewBudgetExpensePopup spentBudgetHandlers={this.savePopupEventHandlers()}
                                                     budgetExpense={{
                                                         id: this.state.id,
                                                         date: this.state.date,
                                                         amount: this.state.amount,
                                                         note: this.state.note,
                                                         searchTag: this.state.searchTag
                                                     }}
                                                     saveCallback={this.saveBudgetExpense}
                                                     searchTagRegistry={this.state.searchTagRegistry}
                                                     modal={this.configMap.budgetExpense(this.props.messageRegistry).newBudgetExpenseModal}/>

                        <SearchFilterPopUp action={this.props.links.home}
                                           searchTagRegistry={this.state.searchTagRegistry}
                                           modal={this.configMap.budgetExpense(this.props.messageRegistry).searchFilterModal}/>

                        <DeleteBudgetExpenseConfirmationPopUp deleteBudgetExpenseAction={this.deleteItem}
                                                              modal={this.configMap.budgetExpense(this.props.messageRegistry).deleteModal}/>


                        <AttachmentsPopUp attachments={this.state.attachments}
                                          attachmentFileRef={this.attachmentFileRef}
                                          actionHandler={{
                                              saveFun: this.saveAttachment.bind(this),
                                              noFun: this.closeAttachmentPopup.bind(this),
                                              downloadFun: this.downloadAttachment.bind(this),
                                              deleteFun: this.deleteAttachment.bind(this)
                                          }}
                                          modal={this.configMap.budgetExpense(this.props.messageRegistry).attachmentModal}/>

                        <div className="row">
                            <div className="col-12 col-md-9">
                                <ContentCard header="Daily detail">
                                    <SpentBudgetContent spentBudget={this.state.spentBudget}
                                                        searchTagRegistry={this.state.searchTagRegistry}
                                                        openAttachmentPopUp={this.openAttachmentPopUp.bind(this)}
                                                        openUpdateBudgetExpensePopUp={this.openUpdateBudgetExpensePopUp.bind(this)}
                                                        openDeleteBudgetExpensePopUp={this.openDeleteBudgetExpensePopUp.bind(this)}/>
                                </ContentCard>
                            </div>

                            <div className="col-12 col-md-3">
                                <ContentCard header="Total by categories">
                                    <TotalBySearchTags totals={this.state.spentBudget.totalDetailList || []}/>
                                </ContentCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
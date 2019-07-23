import {MessageRepository} from "../../domain/repository/MessageRepository";

export class FamilyBudgetPagesConfigMap {

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    budgetExpense(bundle) {
        return {
            menuMessages: {
                insertBudgetModal: "New Budget Expense",
                searchByTagsModal: "Filter by tag",
                title: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.title"),
                userProfileLabel: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.userProfileLabel"),
                logOutLabel: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.logOutLabel")
            },
            loadCsvFile:{
                id: "loadCsvFile",
                title: "Load data by a csv file",
                saveButtonLabel:"Load File ...",
                closeButtonLabel:"Close",
                formUploadFileLabel:"File: "
            },

            newBudgetExpenseModal: {
                id: "insertBudgetModal",
                title: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.newBudgetExpenseModal.title"),
                closeButtonLable: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.newBudgetExpenseModal.closeButtonLable"),
                saveButtonLable: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.newBudgetExpenseModal.saveButtonLable")
            },
            searchFilterModal: {
                id: "searchByTagsModal",
                title: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.searchCriteriaBudgetExpenseModal.title"),
                closeButtonLable: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.searchCriteriaBudgetExpenseModal.closeButtonLable"),
                saveButtonLable: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.searchCriteriaBudgetExpenseModal.saveButtonLable")
            },

            deleteModal: {
                id: "deleteModal",
                title:"Delete Budget Expense",
                message:"Are you sure of delete the Budget Expense from the list?",

            },
            attachmentModal: {
                id: "attachmentPopUp",
                title: "attachmentPopUpTitle",
                saveButtonLable: "Save",
                closeButtonLable: "Close"
            }
        }
    }

    budgetRevenue(bundle) {
        return {
            menuMessages: {
                title: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.title"),
                userProfileLabel: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.userProfileLabel"),
                logOutLabel: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.logOutLabel")
            },
            deleteModal: {id: "deleteBudgetRevenueModal"},
            saveBudgetRevenueModal: {
                id: "saveBudgetRevenueModal",
                title: this.messageRepository.getMessageFor(bundle, "BudgetRevenuePage.newBudgetRevenueModal.title"),
                closeButtonLable: this.messageRepository.getMessageFor(bundle, "BudgetRevenuePage.newBudgetRevenueModal.closeButtonLable"),
                saveButtonLable: this.messageRepository.getMessageFor(bundle, "BudgetRevenuePage.newBudgetRevenueModal.saveButtonLable")
            }
        }
    }

    budgetCharts(bundle) {
        return {
            menuMessages: {
                title: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.title"),
                userProfileLabel: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.userProfileLabel"),
                logOutLabel: this.messageRepository.getMessageFor(bundle, "BudgetExpensePage.menuMessages.logOutLabel")
            }
        }
    }
}
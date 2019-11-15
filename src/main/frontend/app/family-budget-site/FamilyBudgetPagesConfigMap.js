import {MessageRepository} from "../domain/repository/MessageRepository";

export class FamilyBudgetPagesConfigMap {

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    budgetExpense(bundle) {
        return {
            menuMessages: {
                insertBudgetModal: "New Budget Expense",
                searchModal: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.menu.search"),
                diagrams: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.menu.diagrams"),
                searchTags: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.menu.searchTags"),
                title: this.messageRepository.getMessageFor(bundle, "menu.title"),
                userProfileLabel: this.messageRepository.getMessageFor(bundle, "menu.userProfile.label"),
                logOutLabel: this.messageRepository.getMessageFor(bundle, "menu.logOut.label")
            },
            cards:{
                dailyDetails: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.cards.dailyDetails"),
                totalByCategories: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.cards.totalByCategories")
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
                title: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.newBudgetExpenseModal.title"),
                closeButtonLable: this.messageRepository.getMessageFor(bundle, "common.button.close.label"),
                saveButtonLable: this.messageRepository.getMessageFor(bundle, "common.button.save.label")
            },
            searchFilterModal: {
                id: "searchByTagsModal",
                title: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.search.popup.title"),
                closeButtonLable: this.messageRepository.getMessageFor(bundle, "common.button.close.label"),
                saveButtonLable: this.messageRepository.getMessageFor(bundle, "common.button.save.label")
            },

            deleteModal: {
                id: "deleteModal",
                title:"Delete Budget Expense",
                message:"Are you sure of delete the Budget Expense from the list?",

            },
            attachmentModal: {
                id: "attachmentPopUp",
                title: "attachmentPopUpTitle",
                saveButtonLable: this.messageRepository.getMessageFor(bundle, "common.button.save.label"),
                closeButtonLable: this.messageRepository.getMessageFor(bundle, "common.button.close.label")
            }
        }
    }

    budgetRevenue(bundle) {
        return {
            menuMessages: {
                title: this.messageRepository.getMessageFor(bundle, "menu.title"),
                userProfileLabel: this.messageRepository.getMessageFor(bundle, "menu.userProfile.label"),
                logOutLabel: this.messageRepository.getMessageFor(bundle, "menu.logOut.label")
            },
            deleteModal: {id: "deleteBudgetRevenueModal"},
            saveBudgetRevenueModal: {
                id: "saveBudgetRevenueModal",
                title: this.messageRepository.getMessageFor(bundle, "budgetRevenuePage.newBudgetRevenueModal.title"),
                closeButtonLable: this.messageRepository.getMessageFor(bundle, "common.button.close.label"),
                saveButtonLable: this.messageRepository.getMessageFor(bundle, "common.button.save.label")
            }
        }
    }

    budgetCharts(bundle) {
        return {
            menuMessages: {
                title:this.messageRepository.getMessageFor(bundle, "menu.title"),
                userProfileLabel: this.messageRepository.getMessageFor(bundle, "menu.userProfile.label"),
                logOutLabel: this.messageRepository.getMessageFor(bundle, "menu.logOut.label")
            }
        }
    }

    searchTags(bundle) {
        return {
            menuMessages: {
                title: this.messageRepository.getMessageFor(bundle, "menu.title"),
                userProfileLabel: this.messageRepository.getMessageFor(bundle, "menu.userProfile.label"),
                logOutLabel: this.messageRepository.getMessageFor(bundle, "menu.logOut.label")
            }
        }
    }
}
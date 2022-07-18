import {MessageRepository} from "../domain/repository/MessageRepository";

export class FamilyBudgetPagesConfigMap {

    constructor() {
        this.messageRepository = new MessageRepository();
    }

    budgetExpense(bundle) {
        return {
            menuMessages: {
                insertBudgetModal: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.menu.newBudgetExpense"),
                searchModal: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.menu.search"),
                diagrams: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.menu.diagrams"),
                searchTags: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.menu.searchTags"),
                title: this.messageRepository.getMessageFor(bundle, "menu.title"),
                userProfileLabel: this.messageRepository.getMessageFor(bundle, "menu.userProfile.label"),
                logOutLabel: this.messageRepository.getMessageFor(bundle, "menu.logOut.label")
            },
            cards: {
                dailyDetails: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.cards.dailyDetails"),
                totalByCategories: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.cards.totalByCategories")
            },
            loadCsvFile: {
                id: "loadCsvFile",
                title: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.loadCsvFile.popup.title"),
                saveButtonLabel: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.loadCsvFile.popup.save"),
                closeButtonLabel: this.messageRepository.getMessageFor(bundle, "common.button.close.label"),
                formUploadFileLabel: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.loadCsvFile.popup.formUploadFileLabel")
            },

            newBudgetExpenseModal: {
                id: "insertBudgetModal",
                title: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.newBudgetExpense.popup.title"),
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
                title: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.delete.popup.title"),
                message: this.messageRepository.getMessageFor(bundle, "budgetExpensePage.delete.popup.message")
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
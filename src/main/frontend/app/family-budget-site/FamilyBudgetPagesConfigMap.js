import {getMessageFor} from "../domain/repository/MessageRepository";

export class FamilyBudgetPagesConfigMap {

    budgetExpense(bundle) {
        return {
            menuMessages: {
                insertBudgetModal: getMessageFor(bundle, "budgetExpensePage.menu.newBudgetExpense"),
                searchModal: getMessageFor(bundle, "budgetExpensePage.menu.search"),
                diagrams: getMessageFor(bundle, "budgetExpensePage.menu.diagrams"),
                searchTags: getMessageFor(bundle, "budgetExpensePage.menu.searchTags"),
                title: getMessageFor(bundle, "menu.title"),
                userProfileLabel: getMessageFor(bundle, "menu.userProfile.label"),
                logOutLabel: getMessageFor(bundle, "menu.logOut.label")
            },
            cards: {
                dailyDetails: getMessageFor(bundle, "budgetExpensePage.cards.dailyDetails"),
                totalByCategories: getMessageFor(bundle, "budgetExpensePage.cards.totalByCategories")
            },
            loadCsvFile: {
                id: "loadCsvFile",
                title: getMessageFor(bundle, "budgetExpensePage.loadCsvFile.popup.title"),
                saveButtonLabel: getMessageFor(bundle, "budgetExpensePage.loadCsvFile.popup.save"),
                closeButtonLabel: getMessageFor(bundle, "common.button.close.label"),
                formUploadFileLabel: getMessageFor(bundle, "budgetExpensePage.loadCsvFile.popup.formUploadFileLabel")
            },

            newBudgetExpenseModal: {
                id: "insertBudgetModal",
                title: getMessageFor(bundle, "budgetExpensePage.newBudgetExpense.popup.title"),
                closeButtonLable: getMessageFor(bundle, "common.button.close.label"),
                saveButtonLable: getMessageFor(bundle, "common.button.save.label")
            },
            searchFilterModal: {
                id: "searchByTagsModal",
                title: getMessageFor(bundle, "budgetExpensePage.search.popup.title"),
                closeButtonLable: getMessageFor(bundle, "common.button.close.label"),
                saveButtonLable: getMessageFor(bundle, "common.button.save.label")
            },

            deleteModal: {
                id: "deleteModal",
                title: getMessageFor(bundle, "budgetExpensePage.delete.popup.title"),
                message: getMessageFor(bundle, "budgetExpensePage.delete.popup.message")
            }
        }
    }

    budgetRevenue(bundle) {
        return {
            menuMessages: {
                title: getMessageFor(bundle, "menu.title"),
                userProfileLabel: getMessageFor(bundle, "menu.userProfile.label"),
                logOutLabel: getMessageFor(bundle, "menu.logOut.label")
            },
            deleteModal: {id: "deleteBudgetRevenueModal"},
            saveBudgetRevenueModal: {
                id: "saveBudgetRevenueModal",
                title: getMessageFor(bundle, "budgetRevenuePage.newBudgetRevenueModal.title"),
                closeButtonLable: getMessageFor(bundle, "common.button.close.label"),
                saveButtonLable: getMessageFor(bundle, "common.button.save.label")
            }
        }
    }

    searchTags(bundle) {
        return {
            menuMessages: {
                title: getMessageFor(bundle, "menu.title"),
                userProfileLabel: getMessageFor(bundle, "menu.userProfile.label"),
                logOutLabel: getMessageFor(bundle, "menu.logOut.label")
            }
        }
    }
}
export function getAllMessageRegistry() {
    return {
        "menu.userProfile.label": "User Profile",
        "menu.logOut.label": "Log Out",
        "menu.title": "Onlyone Portal (Budget)",
        "common.button.save": "label=Save",
        "common.button.close": "label=Close",
        "budgetExpensePage.menu.newBudgetExpense": "New Budget Expense",
        "budgetExpensePage.menu.search": "Search",
        "budgetExpensePage.menu.searchTags": "Search Tags",
        "budgetExpensePage.menu.diagrams": "Diagram Chart",
        "budgetExpensePage.search.popup": "title=Filter by tag",
        "budgetExpensePage.delete.popup.title": "Delete Budget Expense Attachments",
        "budgetExpensePage.delete.popup.message": "Are you sure of delete the Budget Expense from the list?",
        "budgetExpensePage.attachment.popup.title": "Load Attachments",
        "budgetExpensePage.newBudgetExpense.popup": "title=Save a Budget Expense",
        "budgetExpensePage.loadCsvFile.popup.title": "Load data by a csv file",
        "budgetExpensePage.loadCsvFile.popup.save": "Load File...",
        "budgetExpensePage.loadCsvFile.popup.formUploadFileLabel": "File:",
        "budgetExpensePage.cards.dailyDetails": "Daily details",
        "budgetExpensePage.cards.totalByCategories": "Total by categories",
        "budgetRevenuePage.newBudgetRevenueModal.title": "Save a Revenue Expense",
    }
}

export function getMessageFor(bundle, key) {
    return bundle[key] || "";
}

const BUDGET_EXPENSE_URI = (budgetExpenseId) => budgetExpenseId ?
    `/family-budget/budget-service/budget/expense/${budgetExpenseId}` :
    "/family-budget/budget-service/budget/expense"

const QUERY_PART = (month, year, searchTags) => `q=month=${month};year=${year};searchTag=${searchTags}`;

export class BudgetExpenseRepository {

    saveBudgetExpense(budgetExpense) {
        return fetch(BUDGET_EXPENSE_URI(budgetExpense.id), {
            method: budgetExpense.id ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(budgetExpense),
            credentials: 'same-origin'
        })
    }

    findSpentBudget(searchCriteria) {
        let baseUri = BUDGET_EXPENSE_URI();
        let query = QUERY_PART(searchCriteria.month, searchCriteria.year, searchCriteria.searchTags);
        return fetch([baseUri, query].join("?"), {
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }).then((response) => {
            return response.json();
        })
    }

    deleteBudgetExpense(budgetExpenseId) {
        return fetch([BUDGET_EXPENSE_URI(), budgetExpenseId].join("/"), {
            method: "delete",
            credentials: 'same-origin'
        })
    }

}
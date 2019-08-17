const BUDGET_REVENUE_URI = (budgetRevenueId) => budgetRevenueId ?
    `/family-budget/budget-service/budget/revenue/${budgetRevenueId}` :
    "/family-budget/budget-service/budget/revenue"

const budgetRevenueWith = (year) => `/family-budget/budget-service/budget/revenue?q=year=${year}`

export default class BudgetRevenueRepository {

    deleteBudgetRevenue(budgetRevenueId) {
        return fetch(BUDGET_REVENUE_URI(budgetRevenueId), {
            method: "delete",
            credentials: 'same-origin'
        })
    }

    findSpentBudget(year) {
        return fetch(budgetRevenueWith(year), {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        }).then(response => response.json())
    }

    saveBudgetRevenue(budgetRevenue) {
        console.log(budgetRevenue)
        return fetch(BUDGET_REVENUE_URI(budgetRevenue.id), {
            method: budgetRevenue.id ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(budgetRevenue),
            credentials: 'same-origin'
        })
    }

}
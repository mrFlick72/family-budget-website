const BUDGET_EXPENSE_ATTACHMENT_URI = (budgetExpenseId) => `/family-budget/budget-service/budget/expense/${budgetExpenseId}/attachment`

export class BudgetExpenseFileFileRepository {

    loadBudgetExpenseAttachment(budgetExpenseId, attachment) {
        let data = new FormData();
        data.append('attachment', attachment.files[0]);

        return fetch(BUDGET_EXPENSE_ATTACHMENT_URI(budgetExpenseId), {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            credentials: 'same-origin'
        })
    }

    getBudgetExpenseAttachmentFile(budgetExpenseId, attachmentFileName) {
        return fetch(`/family-budget/budget-service/budget/expense/${budgetExpenseId}/attachment/${attachmentFileName}/name`, {
            method: "GET",
            credentials: 'same-origin'
        }).then(resp => {
            let fileName = resp.headers.get("Content-Disposition").split("=")[1];
            return new Promise((resolve, reject) => {
                resolve({fileName: fileName, content: resp.blob()})
            });
        })
    }

    deleteBudgetExpenseAttachment(budgetExpenseId, attachmentFileName) {
        return fetch(`/family-budget/budget-service/budget/expense/${budgetExpenseId}/attachment/${attachmentFileName}/name`, {
            method: "DELETE",
            credentials: 'same-origin'
        });
    }


    getBudgetExpenseFile(searchCriteria, mediaType) {
        let month = searchCriteria.month;
        let year = searchCriteria.year;
        return fetch(`/family-budget/budget-service/budget-expense?month=${month}&year=${year}`, {
            method: "GET",
            headers: {
                "Accept": mediaType
            },
            credentials: 'same-origin'
        }).then(resp => {
            let fileName = resp.headers.get("Content-Disposition").split("=")[1];
            return new Promise((resolve, reject) => {
                resolve({fileName: fileName, content: resp.blob()})
            });
        })
    }
}
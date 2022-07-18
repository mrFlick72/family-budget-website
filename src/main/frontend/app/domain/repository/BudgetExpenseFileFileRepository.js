export class BudgetExpenseFileFileRepository {

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
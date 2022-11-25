export class SearchTagRepository {

    getSearchTagRegistry() {
        return fetch("/family-budget/budget-service/budget-expense/search-tag", {
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }).then(response => response.json());
    }

    saveSearchTag(searchTag) {
        return fetch("/family-budget/budget-service/budget-expense/search-tag/v2", {
            method: "PUT",
            body: JSON.stringify(searchTag),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
        })
    }
}
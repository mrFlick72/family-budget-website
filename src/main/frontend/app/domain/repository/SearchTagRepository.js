export class SearchTagRepository {

    getSearchTagRegistry(){
        return fetch("/family-budget/budget-service/budget-expense/search-tag", {
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }).then(response => response.json());
    }
}
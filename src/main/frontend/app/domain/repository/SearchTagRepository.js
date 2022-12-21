export function getSearchTagRegistry() {
    return fetch("/family-budget/budget-service/budget-expense/search-tag", {
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    }).then(response => response.json())
}

export function saveSearchTag(searchTag) {
    return fetch("/family-budget/budget-service/budget-expense/search-tag", {
        method: "PUT",
        body: JSON.stringify(searchTag),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
    })
}
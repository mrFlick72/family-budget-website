export async function getSearchTagRegistry() {
    let responsePromise = await fetch("/family-budget/budget-service/budget-expense/search-tag", {
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    });
    return responsePromise.json();
}

export async function saveSearchTag(searchTag) {
    return fetch("/family-budget/budget-service/budget-expense/search-tag", {
        method: "PUT",
        body: JSON.stringify(searchTag),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
    })
}
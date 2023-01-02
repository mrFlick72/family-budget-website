export function getMonthRegistry() {
    return fetch("/family-budget/month", {
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    }).then(response => response.json());
}
export class MonthRepository {

    getMonthRegistry() {
        return fetch("/site/month", {
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }).then(response => response.json());
    }
}
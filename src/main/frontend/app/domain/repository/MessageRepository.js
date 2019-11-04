export class MessageRepository {

    getAllMessageRegistry() {
        return fetch("/family-budget/v2/messages", {
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }).then(response => response.json());
    }

    getMessageRegistry(page) {
        return fetch("/family-budget/messages/" + page, {
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }).then(response => response.json());
    }

    getMessageFor(bundle, key) {
        return bundle[key] || "";
    }
}
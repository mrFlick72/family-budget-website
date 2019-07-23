export class MessageRepository {

    getAllMessageRegistry() {
        return fetch("/site/messages", {
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
        }).then(response => response.json());
    }

    getMessageRegistry(page) {
        return fetch("/site/messages/" + page, {
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
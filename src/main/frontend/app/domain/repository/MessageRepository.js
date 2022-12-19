export async function getAllMessageRegistry() {
    let responsePromise = await fetch("/family-budget/v2/messages", {
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    });
    return responsePromise.json();
}

export async function getMessageRegistry(page) {
    let responsePromise = await fetch("/family-budget/messages/" + page, {
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'same-origin',
    });
    return responsePromise.json();
}

export async function getMessageFor(bundle, key) {
    return bundle[key] || "";
}

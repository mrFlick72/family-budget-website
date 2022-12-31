import 'url-search-params-polyfill';

export function getMonth() {
    const search = new URLSearchParams(window.location.search)
    return search.get("choicedMonth");
}

export function getYear() {
    const search = new URLSearchParams(window.location.search)
    return search.get("year");
}

export function getSearchTags() {
    const search = new URLSearchParams(window.location.search)
    return search.get("searchTag") || "";
}
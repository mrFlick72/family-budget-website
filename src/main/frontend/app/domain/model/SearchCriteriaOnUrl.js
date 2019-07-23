import 'url-search-params-polyfill';

export class SearchCriteriaOnUrl {

    constructor() {
        this.search = new URLSearchParams(window.location.search);
    }

    getMonth() {
        return this.search.get("choicedMonth");
    }

    getYear() {
        return this.search.get("year");
    }

    getSearchTags() {
        return this.search.get("searchTag") || "";
    }
}
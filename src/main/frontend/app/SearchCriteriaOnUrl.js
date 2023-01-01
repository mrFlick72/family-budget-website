export function getMonth() {
    let month = window.sessionStorage.getItem("month");
    if (!month) {
        month = String(new Date().getMonth() + 1);
        window.sessionStorage.setItem("month", month)
    }
    return month
}

export function setMonth(month) {
    window.sessionStorage.setItem("month", month)
}

export function getYear() {
    let year = window.sessionStorage.getItem("year");
    if (!year) {
        year = String(new Date().getFullYear());
        window.sessionStorage.setItem("year", year)
    }
    return year
}

export function setYear(year) {
    window.sessionStorage.setItem("year", year)
}

export function getSearchTags() {
    let searchTags = window.sessionStorage.getItem("searchTags");
    if (!searchTags) {
        searchTags = ""
        window.sessionStorage.setItem("searchTags", searchTags)
    }
    return searchTags
}

export function setSearchTags(searchTags) {
    window.sessionStorage.setItem("searchTags", searchTags)
}

export function resetSearchParameters() {
    window.sessionStorage.removeItem("month")
    window.sessionStorage.removeItem("year")
    window.sessionStorage.removeItem("searchTags")

    getMonth()
    getYear()
    getSearchTags()
}
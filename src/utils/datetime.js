function renderDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    return date.toLocaleDateString();
}

function renderTime(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    return date.toLocaleTimeString();
}

export { renderDate, renderTime };

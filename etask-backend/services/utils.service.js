

function isDateType(stringDate) {
    const date = new Date(stringDate);
    return date instanceof Date && !isNaN(date);
}

module.exports = {
    isDateType
}
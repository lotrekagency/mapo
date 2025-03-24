const pad = (val, len = 2) => String(val).padStart(len, "0");
const convertToDate = (date) =>
    typeof date == "string" ? new Date(date) : date;

function getUTC(date) {
    return new Date(date.toISOString().slice(0, -1));
}

function cleanDateStr(dateStr) {
    return dateStr &&
        !dateStr.endsWith("Z") &&
        dateStr.slice(-6).indexOf("+") === -1 &&
        dateStr.slice(-6).indexOf("-") === -1
        ? dateStr + "Z"
        : dateStr;
}

function formatLocalTime(date) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
    )}`;
}

function formatLocalDate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}`;
}

function formatLocalDateTime(date) {
    return `${formatLocalDate(date)}T${formatLocalTime(date)}`;
}

function formatUTCTime(date) {
    return formatLocalTime(getUTC(date));
}

function formatUTCDate(date) {
    return formatLocalDate(getUTC(date));
}

const formatOps = Object.fromEntries(
    Object.entries({
        getUTC,
        formatLocalTime,
        formatLocalDate,
        formatLocalDateTime,
        formatUTCTime,
        formatUTCDate
    }).map(([k, func]) => [k, (date) => func(convertToDate(date))])
);

function mergeDate(dateTime, date) {
    let newDateTime = new Date(dateTime);
    date = convertToDate(date);
    newDateTime.setFullYear(date.getFullYear());
    newDateTime.setMonth(date.getMonth());
    newDateTime.setDate(date.getDate());
    return newDateTime;
}

function mergeTime(dateTime, time) {
    let newDateTime = new Date(dateTime);
    let timeDateTime = new Date(`2000-01-01T${time}`);
    return mergeDate(timeDateTime, newDateTime);
}

export { cleanDateStr, mergeDate, mergeTime };

export const { getUTC, formatLocalTime, formatLocalDate, formatLocalDateTime, formatUTCTime, formatUTCDate } = formatOps;

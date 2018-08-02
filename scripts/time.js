function ToNiceTime(UTCString) {
    var now = new Date().getTime() / 1000;
    var sPerMinute = 60;
    var sPerHour = sPerMinute * 60;
    var sPerDay = sPerHour * 24;
    var sPerMonth = sPerDay * 30;
    var sPerYear = sPerDay * 365;
    var elapsed = now - UTCString;
    if (elapsed < sPerMinute)
        return Math.round(elapsed / 1000) + ' seconds ago';
    else if (elapsed < sPerHour)
        return Math.round(elapsed / sPerMinute) + ' minutes ago';
    else if (elapsed < sPerDay)
        return Math.round(elapsed / sPerHour) + ' hours ago';
    else if (elapsed < sPerMonth)
        return Math.round(elapsed / sPerDay) + ' days ago';
    else if (elapsed < sPerYear)
        return Math.round(elapsed / sPerMonth) + ' months ago';
    else
        return Math.round(elapsed / sPerYear) + ' years ago';
}
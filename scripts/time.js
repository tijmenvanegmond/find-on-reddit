function ToNiceTime(timestamp) {    
    let val = timestampToNamedDuration(timestamp);   
    return  `${val.val} ${val.name}${val.val === 1?"":"s"} ago`
}

function timestampToNamedDuration(timestamp)
{
    var now = new Date().getTime() / 1000;
    var sPerMinute = 60;
    var sPerHour = sPerMinute * 60;
    var sPerDay = sPerHour * 24;
    var sPerMonth = sPerDay * 30;
    var sPerYear = sPerDay * 365;
    var elapsed = now - timestamp;

    if (elapsed < sPerMinute){
        return Math.round(elapsed / 1000)
    }
    else if (elapsed < sPerHour)
        return { name:'minute', val: Math.round(elapsed / sPerMinute) };
    else if (elapsed < sPerDay)
        return { name:'hour', val: Math.round(elapsed / sPerHour) };
    else if (elapsed < sPerMonth)
        return { name:'day', val: Math.round(elapsed / sPerDay) };
    else if (elapsed < sPerYear)
        return { name:'month', val: Math.round(elapsed / sPerMonth) };
    else
        return { name:'year', val:  Math.round(elapsed / sPerYear) };
}
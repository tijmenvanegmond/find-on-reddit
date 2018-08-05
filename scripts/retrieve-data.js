const REDDIT_URL = "https://www.reddit.com";
const REDDIT_URL_FORWARD = "https://www.reddit.com/";
const REDDIT_MAX_SEARCHWORDS = 8;
const DOMAIN_USE_PARAMETERS = [
    { domain: "youtube.com", parameter_name: "v"},
    { domain: "google.com", parameter_name: "q"}
]
function RetrieveDataAboutUrl(info, callback) {
    if (info.url === undefined)
        throw ("FIND-ON-REDDIT: info object must have a url property");
    var searchTerms = DeconstructURLForSearchTerms(info);
    let redditSearchURL = `https://api.reddit.com/search?q=${searchTerms}&limit=${SettingsData.loadlimit}`;    
    console.log("FIND-ON-REDDIT: retrieving data from: " + redditSearchURL);
    info.api_call_url = redditSearchURL;
    info.callback = callback;
    HttpGetAsync(redditSearchURL, SaveData, info);
}

function DeconstructURLForSearchTerms(info) {
    let url = info.url;
    var searchTerm = `url:"${url.hostname+url.pathname}"`;

    let domainData = GetDomainData(url.host);
    if(domainData)
    {
        let paramValue = url.searchParams.get(domainData.parameter_name);
        if (paramValue != undefined)
            searchTerm = `url:"${paramValue}"`;
    }

    switch (url.hostname) {
        case "reddit.com":
        case "old.reddit.com":
        case "www.reddit.com":
            let titleMinusSubreddit = info.title.split(" : ")[0];
            let titleArray = titleMinusSubreddit.split(" ");
            let amountOfWordsToShortTo = Math.min(REDDIT_MAX_SEARCHWORDS, titleArray.length);
            let shortTitle = titleArray.splice(0, amountOfWordsToShortTo).join(" ");
            searchTerm = encodeURIComponent(shortTitle);
            break;
    }
    return searchTerm;
}

function GetDomainData(domain)
{
    domain = domain.replace("www.","");
    return DOMAIN_USE_PARAMETERS.find(obj => obj.domain === domain);
}

function HttpGetAsync(url, callback, sendThroughInfo) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, sendThroughInfo);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send();
}

function SaveData(response, info) {
    var json = JSON.parse(response);
    var posts = []
    json.data.children.forEach(post => {
        posts.push(
            {
                title: post.data.title,
                permalink: REDDIT_URL + post.data.permalink,
                score: post.data.score,
                subreddit_name: post.data.subreddit_name_prefixed,
                subreddit_link: REDDIT_URL_FORWARD + post.data.subreddit_name_prefixed,
                author_name: post.data.author,
                author_link: REDDIT_URL_FORWARD + "u/" + post.data.author,
                timestamp: post.data.created_utc,
                time_ago: ToNiceTime(post.data.created_utc),
                num_comments: post.data.num_comments
            }
        );
    });

    var newData = {
        title: info.title,
        url: info.url.toString(),
        api_call_url: info.api_call_url,
        timeStamp: Date.now(),
        data: posts
    }
    Cache.Set(newData);
    if (info.callback)
        info.callback(newData);
    Badge.Set({ text: newData.data.length });
}

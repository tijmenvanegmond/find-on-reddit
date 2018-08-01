var DEFAULT_AUTOLOAD = "always";
var redditData;
var autoloadRestriction = DEFAULT_AUTOLOAD;
var tabURL;

var getting = browser.storage.local.get("autoload");
getting.then(SetAutoloadValue);
function SetAutoloadValue(result) {
    autoloadRestriction = result.autoload || DEFAULT_AUTOLOAD;
}

chrome.runtime.onMessage.addListener(function (request) {
    if (request.cmd === "gibData") {
         if(!CanAutoload(tabURL))
             SearchReddit(tabURL);
         else
             chrome.runtime.sendMessage({data:redditData});
    }
});
chrome.tabs.onUpdated.addListener(OnTabChange);
chrome.tabs.onActivated.addListener(OnTabChange);

function OnTabChange() {
    chrome.browserAction.setBadgeText(
        {text: ""}
    );
    var query = {active: true, currentWindow: true};
    chrome.tabs.query(query, AutoLoad);
}

function AutoLoad(tabInfo) {
    tabURL = new URL(tabInfo[0].url);
    if(CanAutoload(tabURL))
        SearchReddit(tabURL);
}

function CanAutoload(url)
{
    switch (autoloadRestriction) {
        case "never":
            return false;
        case "onlyYouTube":
            return url.hostname === "www.youtube.com"
        default:
            return true;
    }
}

function SearchReddit(url) {
    var searchTerms = DeconstructURLForSearchTerms(url);
    let redditSearchURL = `https://api.reddit.com/search?q=${searchTerms}&limit=10&sort=top`;
    HttpGetAsync(redditSearchURL, UpdateBadge);
}

function DeconstructURLForSearchTerms(url) {
    var searchTerm = `url:${url.href}`;
    switch (url.hostname) {
        case "www.youtube.com":
            var videoID = url.searchParams.get("v");
            if (videoID !== undefined)
                searchTerm = `url:${videoID}`;
            break;      
    }
    return searchTerm;
}

function HttpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send();
}

function UpdateBadge(response) {
    redditData = response;
    var json = JSON.parse(response);
    chrome.browserAction.setBadgeText(
        {text: String(json.data.dist)}
    );
    chrome.browserAction.setBadgeBackgroundColor({color: "green"});
    chrome.runtime.sendMessage({data:redditData});
}
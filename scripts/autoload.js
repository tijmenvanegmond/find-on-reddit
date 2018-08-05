/*
    this script listens to tab and url changes then it updates the badge and if it is allowed/necessary it wil retrieve call RetrieveDataAboutUrl in retrieve-data.js
*/
chrome.tabs.onUpdated.addListener(OnTabChange);
chrome.tabs.onActivated.addListener(OnTabChange);

function OnTabChange() {
    Badge.Reset();
    var query = { active: true, currentWindow: true };
    chrome.tabs.query(query, GotTabInfo);
}

function GotTabInfo(tabData) {
    tabData = tabData[0];
    tabData.url = new URL(tabData.url);
    CheckCache(tabData);
}

function CheckCache(tabInfo) {
    if (Cache.Has(tabInfo.url)) {
        let amountOfPosts = Cache.Get(tabInfo.url).data.length;
        Badge.Set({ text: amountOfPosts });
    }
    else {
        AutoLoadIfAllowed(tabInfo);
    }
}

function AutoLoadIfAllowed(tabInfo) {
    if (SettingsData.autoload === true || DomainInWhitelist(tabInfo.url))
        RetrieveDataAboutUrl(tabInfo);
    else {
        console.log("FIND-ON-REDDIT: not allowed to autoload");
    }
}

function DomainInWhitelist(tabURL) {
    var domain = tabURL.host.replace('www.', '');
    if (domain) //only if theres a domain
        return SettingsData.whitelist.includes(domain);
    return false;
}
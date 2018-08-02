chrome.tabs.onUpdated.addListener(OnTabChange);
chrome.tabs.onActivated.addListener(OnTabChange);

function OnTabChange() {
    var query = {active: true, currentWindow: true};
    chrome.tabs.query(query, GotTab);
}

function GotTab(tabInfo) {
    tabURL = new URL(tabInfo[0].url);
    CheckCache(tabURL)   
}

function CheckCache(tabURL)
{
    if(!IsCached(tabURL))    
        AutoLoadIfAllowed(tabURL)
}

function AutoLoadIfAllowed(tabURL)
{
    if(SettingsData.AutoloadON)
        RetrieveDataAboutUrl(tabURL);
    else
        console.log("not allowed to autoload")
}

function ResetBadge()
{    
    chrome.browserAction.setBadgeText(
        {text: ""}
    );
}
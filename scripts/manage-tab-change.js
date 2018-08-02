chrome.tabs.onUpdated.addListener(OnTabChange);
chrome.tabs.onActivated.addListener(OnTabChange);

function OnTabChange() {
    Badge.Reset();
    var query = {active: true, currentWindow: true};
    chrome.tabs.query(query, GotTab);
}

function GotTab(tabInfo) {
    tabURL = new URL(tabInfo[0].url);
    CheckCache(tabURL)   
}

function CheckCache(tabURL)
{
    if(Cache.Has(tabURL)){
        let amountOfPosts = Cache.Get(tabURL).data.length;
        Badge.Set({text:amountOfPosts});
    }      
    else{
        AutoLoadIfAllowed(tabURL);
    }
}

function AutoLoadIfAllowed(tabURL)
{
    //TODO:whitelist implementation
    if(SettingsData.AutoloadON)
        RetrieveDataAboutUrl(tabURL);
    else
        console.log("not allowed to autoload")
}
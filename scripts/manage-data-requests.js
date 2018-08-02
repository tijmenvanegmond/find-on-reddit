chrome.runtime.onMessage.addListener(function (request) {
    if (request.cmd === "gibData") {
        var query = {active: true, currentWindow: true};
        chrome.tabs.query(query, ManageRequestsGotTab);
    }
});

function ManageRequestsGotTab(tabInfo) {
    tabURL = new URL(tabInfo[0].url);
    var data;

    if(Cache.Has(tabURL))
    {
        SendData(Cache.Get(tabURL));
    }
    else
    {
        RetrieveDataAboutUrl(tabURL, SendData);
    }
}

function SendData(redditData)
{
    redditData = JSON.stringify(redditData);
    chrome.runtime.sendMessage({cmd:"sendData",data:redditData});
}
chrome.runtime.onMessage.addListener(function (request) {
    if (request.cmd === "gibData") {
        var query = {active: true, currentWindow: true};
        chrome.tabs.query(query, GotTabManageRequests);
    }
});

function GotTabManageRequests(tabInfo) {
    tabURL = new URL(tabInfo[0].url);
    var data;

    if(IsCached(tabURL))
    {
        SendData(GetFromCache(tabURL));
    }
    else
    {
        RetrieveDataAboutUrl(tabURL, SendData);
    }
}

function SendData(redditData)
{
    console.log(redditData);
    redditData = JSON.stringify(redditData);
    chrome.runtime.sendMessage({cmd:"sendData",data:redditData});
}
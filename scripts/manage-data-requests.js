chrome.runtime.onMessage.addListener(function (request) {
    if (request.cmd === "gibData") {
        let forceReload = request.force_reload || false;
        var query = {active: true, currentWindow: true};
        chrome.tabs.query(query, result => ManageRequestsGotTab(result,forceReload));
    }
});

function ManageRequestsGotTab(tabInfo , forceReload) {
    tabURL = new URL(tabInfo[0].url);

    if(forceReload)
        console.log("FIND-ON-REDDIT: did a forced reload");

    if(!forceReload && Cache.Has(tabURL))
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
    chrome.runtime.sendMessage({cmd:"sendData", data:redditData});
}
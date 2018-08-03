chrome.runtime.onMessage.addListener(function (request) {
    if (request.cmd === "gibData") {
        let forceReload = request.force_reload || false;
        var query = { active: true, currentWindow: true };
        chrome.tabs.query(query, result => ManageRequestsGotTab(result, forceReload));
    }
});

function ManageRequestsGotTab(tabData, forceReload) {
    tabData = tabData[0];
    tabData.url = new URL(tabData.url);

    if (forceReload)
        console.log("FIND-ON-REDDIT: did a forced reload");

    if (!forceReload && Cache.Has(tabData.url)) {
        SendData(Cache.Get(tabData.url));
    }
    else {
        RetrieveDataAboutUrl(tabData, SendData);
    }
}

function SendData(redditData) {
    redditData = JSON.stringify(redditData);
    chrome.runtime.sendMessage({ cmd: "sendData", data: redditData });
}
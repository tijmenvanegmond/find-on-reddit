const DEFAULT_OPTIONS = {
    autoload: true,
    whitelist: "youtube.com youtu.be reddit.com old.reddit.com",
    loadlimit: 15
};
var SettingsData = {}

UpdateSettings();
//receive when to update options
chrome.runtime.onMessage.addListener(function (answer) {
    if (answer.cmd === "updateSettings") {
        UpdateSettings();
    }
});

function UpdateSettings() {
    chrome.storage.local.get(null, SetSettings); //retrieve data
    Cache.Empty();
    console.log("FIND-ON-REDDIT: updated settings");
}

function SetSettings(data) {
    data = SetDefaults(data);
    SettingsData = data;
}

function SetDefaults(data) {
    let hasSetDefault = false;
    if (data === undefined) {
        hasSetDefault = true;
        data = DEFAULT_OPTIONS;
    }
    for (let propName in DEFAULT_OPTIONS) {
        if (data[propName] === undefined) {
            hasSetDefault = true;
            data[propName] = DEFAULT_OPTIONS[propName];
        }
    }
    if (hasSetDefault)
        chrome.storage.local.set(data); //save defaults    
    return data;
}
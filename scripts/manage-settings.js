/*
    This script will load the settings (options) so that they are easily accesable for the other backgroundscripts.
    If some (or all) settings are not set it wil use the provided defaults beneath.
*/
const DEFAULT_DOMAIN_PARAMETERS = [
    { domain: "youtube.com", parameter_name: "v"},
    { domain: "google.com", parameter_name: "q"}
]
const DEFAULT_SETTINGS = {
    autoload: true,
    whitelist: "youtube.com youtu.be reddit.com old.reddit.com",
    loadlimit: 15,
    domain_parameters: DEFAULT_DOMAIN_PARAMETERS
};
var SettingsData = {}

UpdateSettings();
//receive when to update settings
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
        data = DEFAULT_SETTINGS;
    }
    for (let propName in DEFAULT_SETTINGS) {
        if (data[propName] === undefined) {
            hasSetDefault = true;
            data[propName] = DEFAULT_SETTINGS[propName];
        }
    }
    if (hasSetDefault)
        chrome.storage.local.set(data); //save defaults    
    return data;
}
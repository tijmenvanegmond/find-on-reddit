var DEFAULT_AUTOLOAD = "always";
var SettingsData = {}

UpdateSettings();

function UpdateSettings(){
    var getting = browser.storage.local.get("autoload");
    getting.then(SetAutoloadValue);
}

function SetAutoloadValue(result) {
    SettingsData.AutoloadON = result.autoload === "always";
    SettingsData.Autoload = result.autoload || DEFAULT_AUTOLOAD;
}


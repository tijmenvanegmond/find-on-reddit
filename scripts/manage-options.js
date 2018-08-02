const DEFAULT_OPTIONS ={
    autoload: true,
    whitelist: "www.youtube.com www.youtu.be"
};
var SettingsData = {}

UpdateSettings();

//receive when to update options
chrome.runtime.onMessage.addListener(function (answer) {
    if (answer.cmd === "updateSettings") {
        UpdateSettings();
    }
});

function SetDefaults(data)
{   
    if(data === undefined)
        return DEFAULT_OPTIONS;
    
    for (let propName in DEFAULT_OPTIONS) {
        if(data[propName] === undefined)
            data[propName] = DEFAULT_OPTIONS[propName];
        
    }
    return data;
}


function UpdateSettings(){
    var getting = browser.storage.local.get();
    getting.then(SetSettings);
    console.log("FIND-ON-REDDIT: updated settings");
}

function SetSettings(data) 
{
    data = SetDefaults(data);
    SettingsData = data;
}
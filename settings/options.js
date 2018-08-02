function saveOptions(e)
{
    if(e){ e.preventDefault(); }

    var autoload = document.getElementById('autoload').checked;    
    var whitelist = document.getElementById('whitelist').value;

    chrome.storage.local.set({
        autoloadON: autoload,
        whitelist : whitelist
    });

    chrome.runtime.sendMessage({cmd:"updateSettings"});
}

function onGotOptions(item) {
    document.getElementById('autoload').checked = item.autoload;
    document.getElementById('whitelist').value = item.whitelist;
} 

function onError(error) {
    console.log(`Error: ${error}`);
}

function restoreOptions() {
    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGotOptions, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
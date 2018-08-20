const FALLBACK_LIMIT = 10;

function saveOptions(e) {
    if (e) { e.preventDefault(); }
    var use_dark_theme =  document.getElementById('useDarkTheme').checked
    var autoload = document.getElementById('autoload').checked;
    var whitelist = document.getElementById('whitelist').value;
    var loadlimit = document.getElementById('loadlimit').value;
    loadlimit = Number(loadlimit);
    loadlimit = Number.isNaN(loadlimit) ? FALLBACK_LIMIT : loadlimit;
    let optionsData = {
            use_dark_theme : use_dark_theme,
            autoload: autoload,
            whitelist: whitelist,
            loadlimit: loadlimit       
    };
    chrome.storage.local.set(optionsData, tellToUpdate);
}

function tellToUpdate() {
    chrome.runtime.sendMessage({ cmd: "updateSettings" });
}

function onGotOptions(item) {
    document.getElementById('useDarkTheme').checked = item.use_dark_theme;
    document.getElementById('autoload').checked = item.autoload;
    document.getElementById('whitelist').value = item.whitelist;
    document.getElementById('loadlimit').value = item.loadlimit;
}

function restoreOptions() {
    chrome.storage.local.get(null,onGotOptions );
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
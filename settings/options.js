function clickAutoloadRadio() {
    chrome.storage.local.set({
        autoload: getAutoloadValue()
    });
}

function getAutoloadValue() {
    var radios = document.getElementsByName('autoload');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked)
            return radios[i].value;
    }
}

function setAutoloadValue(result) {
    let value = result.autoload || "always";
    var radios = document.getElementsByName('autoload');
    for (var i = 0, length = radios.length; i < length; i++) {
        radios[i].checked = radios[i].value === value;
    }
    //add save trigger functions to radiobuttons
    for(var i = 0; i < radios.length; i++) {
        radios[i].onclick = clickAutoloadRadio
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function restoreOptions() {
    var getting = browser.storage.local.get("autoload");
    getting.then(setAutoloadValue, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
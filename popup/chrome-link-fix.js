var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (isChrome){
    window.addEventListener('click', function (e) {
        if (e.target.href !== undefined) {
            chrome.tabs.create({ url: e.target.href })
        }
    });
}
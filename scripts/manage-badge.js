const DEFAULT_BADGE_COLOUR = "green";

function ResetBadge()
{    
    chrome.browserAction.setBadgeText(
        {text: null}
    );
}

function SetBadge(options)
{    
    chrome.browserAction.setBadgeText(
        {text: String(options.text)}
    );
    
    chrome.browserAction.setBadgeBackgroundColor({color: options.color || options.colour || DEFAULT_BADGE_COLOUR});
}
const DEFAULT_BADGE_COLOUR = "green";
var Badge = {
    
    Reset : function ()
    {    
        chrome.browserAction.setBadgeText(
            {text: null}
        );
    },

    Set : function(options)
    {    
        chrome.browserAction.setBadgeText(
            {text: String(options.text)}
        );
        
        chrome.browserAction.setBadgeBackgroundColor({color: options.color || options.colour || DEFAULT_BADGE_COLOUR});
    }
};
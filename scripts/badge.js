const DEFAULT_BADGE_COLOUR = "green";
var Badge = {

    Reset () {
        chrome.browserAction.setBadgeText(
            { text: "" }
        );
    },

    Set (options) {
        chrome.browserAction.setBadgeText(
            { text: String(options.text) }
        );

        chrome.browserAction.setBadgeBackgroundColor({ color: options.color || options.colour || DEFAULT_BADGE_COLOUR });
    }
};
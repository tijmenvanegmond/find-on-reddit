const REDDIT_SUBMIT_URL = "https://www.reddit.com/submit?";
const MAX_STRING_LENGTH = 75;

//ask for data
window.onload = function () {    
    chrome.runtime.sendMessage({ cmd: "gibSettings"});
    AskForData();
}

function AskForData(forceReload) {
    //only display loader   
    document.getElementById("loader").className = "loader";
    document.getElementById("content").className = "hidden";
    document.getElementById("no-results").className = "hidden";

    chrome.runtime.sendMessage({ cmd: "gibData", force_reload: forceReload || false });
}

//receive data
chrome.runtime.onMessage.addListener(function (answer) {
    if(answer.cmd === "sendSettings"){
        UpdateCSS(answer.data);
    }
    else if (answer.cmd === "sendData") {
        RenderResults(answer.data);
    } 
});

function UpdateCSS(settings)
{   //set light theme colors
    if(settings.use_dark_theme === false){
        document.documentElement.style.color = "#505050";
        document.documentElement.style.backgroundColor = "#ffffff";
        document.body.style.color = "#505050";
        document.body.style.backgroundColor = "#ffffff";
    }
}

function RenderResults(response) {
    var data = JSON.parse(response);

    document.getElementById("loader").className += " hidden";  
    document.getElementById("content").className = "";
    document.getElementById("btn-submit").onclick = x => { OpenRedditSubmit(data) };
    document.getElementById("btn-refresh").onclick = x => { AskForData(true) };
    document.getElementById("btn-options").onclick = OpenOptions;    
    document.getElementById("popup-content").innerHTML = "";
    
    let searchlinkUrl = data.api_call_url.replace("api","www");
    let = searchlink = document.getElementById("searchlink");   
    searchlink.innerText = searchlinkUrl;
    searchlink.setAttribute("href", searchlinkUrl);

    if (data.data.length < 1) {
        document.getElementById("no-results").className = "";
        return;
    }
    data.data.forEach(AddPost);
}

function OpenRedditSubmit(data) {
    url = `${REDDIT_SUBMIT_URL}url=${encodeURIComponent(data.url)}&title=${data.title}`
    window.open(url);
}

function OpenOptions() {
    chrome.runtime.openOptionsPage();
}

function StringEllipsize(aString)
{
    if(aString.length >= MAX_STRING_LENGTH + 3)
        return aString.substring(0, MAX_STRING_LENGTH).trim() + "...";
    return aString;
}

function AddPost(post) {
    post.title_ellipsized = StringEllipsize(post.title);
    let newPost = templates.row;
    for (var prop in post) {
        let reg = new RegExp(`{{${prop}}}`, "gi");
        newPost = newPost.replace(reg, post[prop]);
    }
    var body = document.getElementById("popup-content");
    body.innerHTML += newPost; //TODO: firefox wants this sanitized
}
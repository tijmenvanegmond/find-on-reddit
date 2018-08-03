//ask for data
window.onload = function () {
    AskForData();
}

function AskForData(forceReload) {    
    document.getElementById("navbar").className += " hidden";    
    document.getElementById("loader").className = "loader";
    document.getElementById("popup-content").innerHTML = "";
    document.getElementById("searchlink").innerText ="";

    chrome.runtime.sendMessage({ cmd: "gibData", force_reload: forceReload || false});    
}

//receive data
chrome.runtime.onMessage.addListener(function (answer) {
    if (answer.cmd === "sendData") {
        RenderResults(answer.data);
    }
});

function RenderResults(response) {
    var json = JSON.parse(response);
   
    document.getElementById("navbar").className = "navbar";
    document.getElementById("loader").className += " hidden";
    document.getElementById("searchlink").innerText = json.api_call_url;
    document.getElementById("btn-refresh").onclick = x => {AskForData(true)};
    document.getElementById("btn-options").onclick = OpenOptions;

    var content = document.getElementById("popup-content");
    content.innerHTML = "";
    if (json.data.length < 1) {
        content.innerHTML = "No posts.";
        return;
    }
    json.data.forEach(AddPost);
}

function OpenOptions(){
    chrome.runtime.openOptionsPage();
}

function AddPost(post) {
    
    let newPost = templates.row;
    for(var prop in post)
    {
        let reg = new RegExp(`{{${prop}}}`,"gi");
        newPost = newPost.replace(reg, post[prop]);
    }
    var body = document.getElementById("popup-content");
    body.innerHTML += newPost;
}
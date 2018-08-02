//ask for data
window.onload = function () {
    AskForData();
}

function AskForData() {
    chrome.runtime.sendMessage({ cmd: "gibData" });
}

//receive data
chrome.runtime.onMessage.addListener(function (answer) {
    if (answer.cmd === "sendData") {
        RenderResults(answer.data);
    }
});

function RenderResults(response) {
    var json = JSON.parse(response);
    var navbar = document.getElementById("navbar");
    navbar.innerText = json.api_call_url;
    var content = document.getElementById("popup-content");
    content.innerHTML = "";
    if (json.data.length < 1) {
        content.innerHTML = "No posts.";
        return;
    }
    json.data.forEach(AddPost);
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
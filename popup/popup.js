//ask for data
window.onload = function() {
    AskForData();
}

function AskForData()
{
    chrome.runtime.sendMessage({cmd: "gibData"});
}

//receive data
chrome.runtime.onMessage.addListener(function (answer) {
    if (answer.cmd === "sendData") {
        RenderResults(answer.data);
    }
});

function RenderResults(response) {
    var json = JSON.parse(response);
    var content = document.getElementById("popup-content");
    content.innerHTML = "";
    if(json.data.length < 1){
        content.innerHTML = "No posts.";
        return;
    }
    json.data.forEach(AddPost);
}

function AddPost(post) {
    var link = document.createElement("tr");
    link.setAttribute("class", "post");

    var scoreEl = document.createElement("td");
    scoreEl.setAttribute("class", "score");
    scoreEl.innerHTML = String(post.score);

    var infoEl = document.createElement("td");
    infoEl.setAttribute("class", "info");
    infoEl.innerHTML+=`<a class="link title" href="${post.permalink}">${post.title}</a>`;
    infoEl.innerHTML+=`<div><a class="link subreddit" href="${post.subreddit_link}">${post.subreddit_name}</a> • posted by <a class="link" href="${post.author_link}">u/${post.author_name}</a> ${ToNiceTime(post.timestamp)}</div>`;
    infoEl.innerHTML+=`<a href="${post.permalink}">${post.num_comments} comments</a>`;

    link.appendChild(scoreEl);
    link.appendChild(infoEl);
    document.getElementById("popup-content").appendChild(link);
}

function ToNiceTime(UTCString) {
    var now = new Date().getTime()/1000;
    var sPerMinute = 60;
    var sPerHour = sPerMinute * 60;
    var sPerDay = sPerHour * 24;
    var sPerMonth = sPerDay * 30;
    var sPerYear = sPerDay * 365;
    var elapsed = now - UTCString;
    if (elapsed < sPerMinute)
        return Math.round(elapsed/1000) + ' seconds ago';
    else if (elapsed < sPerHour)
        return Math.round(elapsed/sPerMinute) + ' minutes ago';
    else if (elapsed < sPerDay )
        return Math.round(elapsed/sPerHour ) + ' hours ago';
    else if (elapsed < sPerMonth)
        return Math.round(elapsed/sPerDay) + ' days ago';
    else if (elapsed < sPerYear)
        return Math.round(elapsed/sPerMonth) + ' months ago';
    else
        return Math.round(elapsed/sPerYear ) + ' years ago';
}
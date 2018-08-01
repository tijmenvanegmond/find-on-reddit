//ask for data
AskForData();

function AskForData()
{
    chrome.runtime.sendMessage({cmd: "gibData"});
}

//receive data
chrome.runtime.onMessage.addListener(function (answer) {
    if(answer.data !== undefined)
        RenderResults(answer.data);
});

function RenderResults(response) {
    var json = JSON.parse(response);
    var content = document.getElementById("popup-content");
    content.innerHTML = "";
    if(json.data.dist < 1){
        content.innerHTML = "No posts.";
        return;
    }
    json.data.children.forEach(AddPost);
}

function AddPost(post) {
    var permalink = "https://www.reddit.com" + post.data.permalink;
    var subRedditLink = "https://www.reddit.com/" + post.data.subreddit_name_prefixed;
    var authorLink = "https://www.reddit.com/u/" + post.data.author;
    var link = document.createElement("tr");
    link.setAttribute("class", "post");

    var scoreEl = document.createElement("td");
    scoreEl.setAttribute("class", "score");
    scoreEl.s
    scoreEl.innerHTML = String(post.data.score);

    var infoEl = document.createElement("td");
    infoEl.setAttribute("class", "info");
    infoEl.innerHTML+=`<a class="link title" href="${permalink}">${post.data.title}</a>`;
    infoEl.innerHTML+=`<div><a class="link subreddit" href="${subRedditLink}">${post.data.subreddit_name_prefixed}</a> • posted by <a class="link" href="${authorLink}">u/${post.data.author}</a> ${ToNiceTime(post.data.created_utc)}</div>`;
    infoEl.innerHTML+=`<a href="${permalink}">${post.data.num_comments} comments</a>`;

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
const REDDIT_URL = "https://www.reddit.com";
const REDDIT_URL_FORWARD = "https://www.reddit.com/";

function RetrieveDataAboutUrl(url, promise)
{    
    var searchTerms = DeconstructURLForSearchTerms(url);
    let redditSearchURL = `https://api.reddit.com/search?q=${searchTerms}&limit=${SettingsData.loadlimit}`;
    console.log("FIND-ON-REDDIT: retrieving data from: "+redditSearchURL);
    var sendThrough = {
        original_url: url.toString(),
        api_call_url: redditSearchURL,
        promise:promise       
    };
    HttpGetAsync(redditSearchURL, SaveData, sendThrough);
}

function DeconstructURLForSearchTerms(url) {
    var searchTerm = `url:${url.href}`;
    switch (url.hostname) {
        case "www.youtu.be":
        case "www.youtube.com":
            var videoID = url.searchParams.get("v");
            if (videoID !== undefined)
                searchTerm = `url:${videoID}`;
            break;
        case "old.reddit.com":
        case "www.reddit.com":
            var roughTitle = url.pathname.match(/comments\/.*\/(.*)\//);
            if (roughTitle && roughTitle[1])
            {
                roughTitle = encodeURI(roughTitle[1]);
                searchTerm = `${roughTitle}`;
            }
            break;
    }
    return searchTerm;
}

function HttpGetAsync(url, callback, sendThrough) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, sendThrough);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send();
}

function SaveData(response, sendThrough) {
    var json = JSON.parse(response);
    var posts = []
    json.data.children.forEach(post => { 
        posts.push(
            {
                title: post.data.title,
                permalink: REDDIT_URL + post.data.permalink,
                score: post.data.score,
                subreddit_name:  post.data.subreddit_name_prefixed,
                subreddit_link:  REDDIT_URL_FORWARD + post.data.subreddit_name_prefixed,
                author_name:  post.data.author,
                author_link: REDDIT_URL_FORWARD +"u/" +post.data.author,
                timestamp:  post.data.created_utc,
                time_ago: ToNiceTime(post.data.created_utc),
                num_comments:   post.data.num_comments
            }
        );
    });

    var newData = {
        url: sendThrough.original_url,
        api_call_url: sendThrough.api_call_url,
        timeStamp: Date.now(),
        data: posts
    }   
    Cache.Set(newData);
    if(sendThrough.promise) 
        sendThrough.promise(newData);
    Badge.Set({text:newData.data.length});
}

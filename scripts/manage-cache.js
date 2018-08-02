var cache = [];

function ToCache(data)
{
    for (let i = 0; i < cache.length; i++) {
        if(cache[i].url == data.url){
            cache[i] = data;
            return;
        } 
    }
    cache.push(data);    
}

function IsCached(url)
{
    url = url.toString();
    for (let i = 0; i < cache.length; i++) {
        if(cache[i].url == url)
            return true;
    }
    return false;
}

function GetFromCache(url)
{
    url = url.toString();
    for (let i = 0; i < cache.length; i++) {
        if(cache[i].url == url)
            return cache[i];   
    }
    return undefined;
}

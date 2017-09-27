/*
    Settings
*/
var blumeConfig = {"p":{},"m":{}};

function loadTheThings() {
    console.log(1);
}

function saveTheThings() {
    bangPrefix = document.getElementById("bangprefix").value;
    currentBang = document.querySelector("input[name=\"defaultbang\"]:checked").id;
    playMusic = document.getElementById("music-toggle").checked;
    
    blumeConfig = {
        "bangPrefix": bangPrefix,
        "currentBang": currentBang,
        "playMusic": playMusic,
        "p": {},
        "m": {}
    }
    console.log(blumeConfig);
}

function removeTheThings(e) {
    e.target.parentNode.outerHTML = "";
}

function addMoreThings(e) {
    e.target.style.display = "none";
    document.getElementById("add"+e.target.id).style.display = "block"; /* use nextSibling instead? */
}

function addThingsNow(e) {
    blumeConfig["p"][document.getElementById("add-"+e.target.id+"-icon").value] = document.getElementById("add-"+e.target.id+"-link").value;
    e.target.parentNode.parentNode.innerHTML = e.target.parentNode.parentNode.innerHTML.replace("<span class=\"fa fa-plus\"", "<span><span class=\"fa fa-times\" id=\""+e.target.id+"-"+document.getElementById("add-"+e.target.id+"-icon").value+"\"></span> <span class=\"fa fa-"+document.getElementById("add-"+e.target.id+"-icon").value+"\"></span> "+document.getElementById("add-"+e.target.id+"-link").value+"<br></span><span class=\"fa fa-plus\"");
    e.target.parentNode.style.display = "none";
    console.log(e.target.parentNode);
    document.getElementById("--"+e.target.id).style.display = "inline";
}

function cancelTheThings(e) {
    e.target.parentNode.style.display = "none";
    document.getElementById("-"+e.target.id).style.display = "block";
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("save").addEventListener("click", saveTheThings, false);

    Array.from(document.getElementsByClassName("fa-times")).forEach(function(e) {
        if(e.parentNode.nodeName !== "LABEL") {
            e.addEventListener('click', removeTheThings, false);
        }
    });

    Array.from(document.getElementsByClassName("fa-plus")).forEach(function(e) {
        e.addEventListener('click', addMoreThings, false);
    });

    Array.from(document.getElementsByClassName("ok")).forEach(function(e) {
        e.addEventListener('click', addThingsNow, false);
    });

    Array.from(document.getElementsByClassName("cancel")).forEach(function(e) {
        e.addEventListener('click', cancelTheThings, false);
    });
    // Load settings
});

/*
    Search
*/
var bangPrefix = "!";
var currentBang = "ddg";
function doTheBang(e, search) {
    var bang;
    var searchBar = document.getElementById("search");
    var key = e.keyCode || e.which;
    var qlist;
    if (key === 32) {
        qList = search.split(" ");
        if (qList[0].substring(0, bangPrefix.length) === bangPrefix) {
            bang = qList[0].substr(bangPrefix.length);
            if (bangs[bang]) {
                currentBang = bang;
                searchBar.placeholder = bangs[bang]['n'];
                searchBar.value = search.replace(qList[0], "").trim();
                e.preventDefault()
            }
        }
    } else if (key === 13 || e.type === "click") {
        if (bang === undefined) {
            bang = currentBang
        }
        qList = search.split(" ");
        if (qList[0].substring(0, bangPrefix.length) === bangPrefix) {
            if (bangs[qList[0].substr(bangPrefix.length)]) {
                bang = qList[0].substr(bangPrefix.length)
            }
        }
        if (bangPrefix + bang === search || search === "") {
            window.location = bangs[bang]["h"]
                .replace(/{{qe}}/g, "")
                .replace(/{{qp}}/g, "")
                .trim()
        } else {
            window.location = bangs[bang]["s"]
                .replace(/{{qe}}/g, encodeURIComponent(search.replace(bangPrefix + bang, "")))
                .replace(/{{qp}}/g, search.replace(bangPrefix + bang, "").replace(/ /g, "+"))
                .trim()
        }
    }
}

/*
    Bangs
*/
var bangs = {
    "?": {
        s:"https://duckduckgo.com/?q={{qe}}",
        h:"https://duckduckgo.com/?q=",
        n:"DuckDuckGo"
    },
    "1337x": {
        s:"http://1337x.to/search/{{qe}}/1/",
        h:"http://1337x.to",
        n:"1337x"
    },
    "1377x": {
        s:"http://www.1377x.to/srch?search={{qe}}",
        h:"http://www.1377x.to",
        n:"1377x"
    },
    "4chg": {
        s:"https://boards.4chan.org/g/catalog#s={{qe}}",
        h:"https://boards.4chan.org",
        n:"4chan technology board"
    },
    "4chpol": {
        s:"https://boards.4chan.org/pol/catalog#s={{qe}}",
        h:"https://boards.4chan.org",
        n:"4chan politic board"
    },
    "4chr9k": {
        s:"https://boards.4chan.org/r9k/catalog#s={{qe}}",
        h:"https://boards.4chan.org",
        n:"4chan robot board"
    },
    "4chmu": {
        s:"https://boards.4chan.org/mu/catalog#s={{qe}}",
        h:"https://boards.4chan.org",
        n:"4chan music board"
    },
    "4chvg": {
        s:"http://boards.4chan.org/vg/catalog#s={{qe}}",
        h:"http://boards.4chan.org",
        n:"4chan, /vg/"
    },
    "4chwg": {
        s:"http://boards.4chan.org/wg/catalog#s={{qe}}",
        h:"http://boards.4chan.org",
        n:"4chan, /wg/"
    },
    "500px": {
        s:"https://500px.com/search?q={{qe}}",
        h:"https://500px.com",
        n:"500px"
    },
    "cache": {
        s:"https://webcache.googleusercontent.com/search?q=cache:{{qe}}",
        h:"https://webcache.googleusercontent.com/",
        n:"Google Cache"
    },
    "cached": {
        s:"https://webcache.googleusercontent.com/search?q=cache:{{qe}}",
        h:"https://webcache.googleusercontent.com/",
        n:"Google Cache"
    },
    "duckduckgo": {
        s:"https://duckduckgo.com/?q={{qe}}",
        h:"https://duckduckgo.com/?q=",
        n:"DuckDuckGo"
    },
    "ddg": {
        s:"https://duckduckgo.com/?q={{qe}}",
        h:"https://duckduckgo.com/?q=",
        n:"DuckDuckGo"
    },
    "ddgi": {
        s:"https://duckduckgo.com/?q={{qe}}&ia=images&iax=1",
        h:"https://duckduckgo.com/?q=&ia=images&iax=1",
        n:"DuckDuckGo Images"
    },
    "ddgv": {
        s:"https://duckduckgo.com/?q={{qe}}&ia=videos",
        h:"https://duckduckgo.com/?q=&ia=videos",
        n:"DuckDuckGo Video Search"
    },
    "lmgtfy": {
        s:"http://www.lmgtfy.com/?q={{qe}}",
        h:"http://www.lmgtfy.com",
        n:"LMGTFY"
    },
    "lmddgtfy": {
        s:"https://lmddgtfy.net/?q={{qe}}",
        h:"https://lmddgtfy.net",
        n:"LMDDGTFY.NET"
    },
    "lmdtfy": {
        s:"http://lmddgtfy.co.cc/?q={{qe}}",
        h:"http://lmddgtfy.co.cc",
        n:"LMDDGTFY.CO.CC"
    },
    "g": {
        s:"https://encrypted.google.com/search?hl=en&q={{qe}}",
        h:"https://encrypted.google.com/",
        n:"Google"
    },
    "google": {
        s:"https://encrypted.google.com/search?hl=en&q={{qe}}",
        h:"https://encrypted.google.com/",
        n:"Google"
    },
    "googol": {
        s:"http://googol.warriordudimanche.net/?q={{qe}}",
        h:"http://googol.warriordudimanche.net",
        n:"Googol"
    },
    "gh": {
        s:"https://github.com/search?q={{qe}}&type=Everything&repo=&langOverride=&start_value=1",
        h:"https://github.com/",
        n:"GitHub.com"
    },
    "gist": {
        s:"https://gist.github.com/search?q={{qe}}",
        h:"https://gist.github.com/",
        n:"Github Gists"
    },
    "github": {
        s:"https://github.com/search?q={{qe}}&type=Everything&repo=&langOverride=&start_value=1",
        h:"https://github.com/",
        n:"GitHub.com"
    },
    "gitlab": {
        s:"https://gitlab.com/search?utf8=%E2%9C%93&search={{qe}}&group_id=&repository_ref=",
        h:"https://gitlab.com",
        n:"GitLab"
    },
    "iqdb": {
        s:"http://iqdb.org/?url={{qe}}",
        h:"http://iqdb.org",
        n:"iqdb"
    },
    "k": {
        s:"https://katcr.co/new/search-torrents.php?search={{qe}}",
        h:"https://katcr.co",
        n:"KickassTorrents"
    },
    "kat": {
        s:"https://katcr.co/new/search-torrents.php?search={{qe}}",
        h:"https://katcr.co",
        n:"KickassTorrents"
    },
    "kickass": {
        s:"https://katcr.co/new/search-torrents.php?search={{qe}}",
        h:"https://katcr.co",
        n:"KickassTorrents"
    },
    "nyaa": {
        s:"https://www.nyaa.si/?page=search&cats=0_0&filter=0&term={{qe}}",
        h:"https://www.nyaa.si",
        n:"Nyaa Torrents"
    },
    "nyaaen": {
        s:"https://www.nyaa.si/?page=search&cats=1_37&filter=0&term={{qe}}",
        h:"https://www.nyaa.si",
        n:"Nyaa Torrents (English)"
    },
    "sukebei": {
        s:"http://sukebei.nyaa.si/?page=search&cats=0_0&filter=0&term={{qe}}",
        h:"http://sukebei.nyaa.si",
        n:"Sukebei NyaaTorrents"
    },
    "sea": {
        s:"https://searchcode.com/?q={{qe}}",
        h:"https://searchcode.com",
        n:"searchcode.com"
    },
    "searchcode": {
        s:"http://searchco.de/?q={{qe}}",
        h:"http://searchco.de",
        n:"searchco.de"
    },
    "code": {
        s:"http://www.searchco.de/?q={{qe}}&cs=on",
        h:"http://www.searchco.de",
        n:"Search Code"
    },
    "qw": {
        s:"http://www.qwant.com/?q={{qe}}",
        h:"http://www.qwant.com",
        n:"Qwant"
    },
    "qwl": {
        s:"https://lite.qwant.com/?q={{qe}}",
        h:"https://lite.qwant.com",
        n:"Qwant lite"
    },
    "qwant": {
        s:"https://www.qwant.com/?q={{qe}}",
        h:"https://www.qwant.com",
        n:"Qwant"
    },
    "r": {
        s:"http://www.reddit.com/search?q={{qe}}",
        h:"http://www.reddit.com",
        n:"Reddit"
    },
    "reddit": {
        s:"http://www.reddit.com/search?q={{qe}}&restrict_sr=&sort=relevance&t=all",
        h:"http://www.reddit.com",
        n:"Reddit"
    },
    "sof": {
        s:"https://stackoverflow.com/search?q={{qe}}",
        h:"https://stackoverflow.com",
        n:"StackOverflow"
    },
    "sub": {
        s:"http://www.reddit.com/r/{{qe}}",
        h:"http://www.reddit.com",
        n:"Reddit"
    },
    "s": {
        s:"https://startpage.com/do/metasearch.pl?query={{qe}}",
        h:"https://startpage.com/",
        n:"StartPage"
    },
    "sp": {
        s:"https://startpage.com/do/metasearch.pl?query={{qe}}",
        h:"https://startpage.com/",
        n:"StartPage"
    },
    "startpage": {
        s:"https://startpage.com/do/metasearch.pl?query={{qe}}",
        h:"https://startpage.com/",
        n:"StartPage"
    },
    "torlock": {
        s:"https://www.torlock.com/?q={{qe}}",
        h:"https://www.torlock.com",
        n:"Torlock"
    },
    "tpb": {
        s:"https://thepiratebay.se/search/{{qe}}/0/99/0",
        h:"https://thepiratebay.se",
        n:"The Pirate Bay"
    },
    "tpball": {
        s:"https://thepiratebay.org/search/{{qe}}/0/99/0",
        h:"https://thepiratebay.org",
        n:"The Pirate Bay"
    },
    "tpbclean": {
        s:"https://tpbclean.com/search/{{qe}}/0/7/0",
        h:"https://tpbclean.com",
        n:"ThePirateBay Clean"
    },
    "yt": {
        s:"https://www.youtube.com/results?search_query={{qe}}",
        h:"https://www.youtube.com",
        n:"YouTube"
    },
    "youtube": {
        s:"https://www.youtube.com/results?search_query={{qe}}",
        h:"https://www.youtube.com",
        n:"YouTube"
    },
    "save": {
        s:"https://web.archive.org/save/{{qe}}",
        h:"https://web.archive.org/",
        n:"Wayback Machine"
    },
    "wbm": {
        s:"https://web.archive.org/web/*/{{qe}}",
        h:"https://web.archive.org/",
        n:"The Wayback Machine"
    },
    "wayback": {
        s:"https://web.archive.org/web/*/{{qp}}",
        h:"https://web.archive.org/",
        n:"Internet Archive: Wayback Machine"
    },
    "wallhaven": {
        s:"https://alpha.wallhaven.cc/search?q={{qe}}",
        h:"https://alpha.wallhaven.cc",
        n:"wallhaven"
    },
    "w": {
        s:"https://en.wikipedia.org/wiki/Special:Search?search={{qe}}&go=Go",
        h:"https://en.wikipedia.org/",
        n:"Wikipedia"
    },
    "wikipedia": {
        s:"https://en.wikipedia.org/wiki/Special:Search?search={{qe}}&go=Go",
        h:"https://en.wikipedia.org/",
        n:"Wikipedia"
    },
}

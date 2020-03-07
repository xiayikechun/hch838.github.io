function FindProxyForURL(url, host) {
    let D = "DIRECT";
    let P = "HTTPS cdn.yqhp.xyz:5050;DIRECT";
    let H = {
        "google.com": 1,
        "googleapis.com": 1,
        "googlecode.com": 1,
        "googleusercontent.com": 1,
        "ggpht.com": 1,
        "gstatic.com": 1,
        "gmail.com": 1,
        "googlegroups.com": 1,
        "goo.gl": 1,
        "googleratings.com": 1,
        "test-ggfwzs-proxy.com": 1,
        "t.co": 1,
        "google.com.hk": 1,
        "google.com.tw": 1,
        "googletagmanager.com": 1,
        "accounts.youtube.com": 1,
        "thinkwithgoogle.com": 1,
        "googletagmanager.com": 1,
        "android.com": 1,
        "wikimedia.org": 1,
        "golang.org": 1,
        "tensorflow.org": 1,
        "wikipedia.org": 1
    };
    let r = host.match(/([^.]*\.([a-z,A-Z]*|com\.[a-z]*|co\.[a-z]*))$/)[1];
    if (r && H.hasOwnProperty(r)) {
        if (host == "scholar.google.com" || host == "scholar.google.com.hk" || host == "scholar.googleusercontent.com") {
            return "HTTPS static.dancemonkey.xyz:443;"
        } else if (host == "mtalk.google.com") {
            return D
        } else {
            return P
        }
    } else {
        return D
    }
}
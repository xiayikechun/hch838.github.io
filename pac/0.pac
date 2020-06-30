var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+Auto", {
    "+Auto": function(url, host, scheme) {
        "use strict";
        if (/(?:^|\.)content\.googleapis\.com$/.test(host)) return "+img.cdn.iguge.app";
        if (/(?:^|\.)google\.com$/.test(host)) return "+img.cdn.iguge.app";
        if (/(?:^|\.)google\.com\.hk$/.test(host)) return "+img.cdn.iguge.app";
        if (/(?:^|\.)gstatic\.com$/.test(host)) return "+img.cdn.iguge.app";
        if (/(?:^|\.)maps\.googleapis\.com$/.test(host)) return "+img.cdn.iguge.app";
        if (/(?:^|\.)ajax\.googleapis\.com$/.test(host)) return "+img.cdn.iguge.app";
        if (/(?:^|\.)googleusercontent\.com$/.test(host)) return "+img.cdn.iguge.app";
        return "DIRECT";
    },
    "+img.cdn.iguge.app": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "HTTPS img.cdn.iguge.app:443";
    }
});
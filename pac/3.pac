var proxy = "HTTPS jpdgvm.mzkservice.com:443;HTTPS jp2.mzke5.buzz:443; DIRECT";
var direct = 'DIRECT;';
var domainsUsingProxy = ["googleapis.com", "googlecode.com", "googleusercontent.com", "ggpht.com", "gstatic.com", "gmail.com", "googlegroups.com", "googleratings.com", "google.com.hk", "google.com.tw", "google.co.jp", "google.co.kr", "google.co.th", "google.com.vn", "google.com.sg", "google.com.my", "google.com.ru", "google.ae", "google.com.sa", "google.co.in", "google.com.np", "google.de", "google.com.kw", "google.com.co", "google.fr", "google.co.uk", "google.it", "google.gr", "google.pt", "google.es", "google.co.il", "google.ch", "google.se", "google.nl", "google.be", "google.at", "google.pl", "google.pt", "google.es", "google.fi", "google.nl", "google.co.hu", "google.com.tr", "google.ro", "google.dk", "google.no", "google.com.au", "google.co.nz", "google.ca", "google.com", "google.com.mx", "google.com.br", "google.com.ar", "google.cl", "google.com.pe", "google.com.eg", "google.com.pa", "google.lt", "google.bi", "google.pn", "google.li", "google.com.nf", "google.vg", "google.mw", "google.fm", "google.sh", "google.cd", "google.ms", "google.co.cr", "google.lv", "google.ie", "google.co.gg", "google.co.je", "google.pr", "google.com.py", "google.gm", "google.td", "google.com.ua", "google.co.ve", "google.com.tr", "google.com.mt", "google.com.uy", "google.hn", "google.com.ni", "google.gl", "google.kz", "google.sm", "google.co.mu", "google.as", "google.uz", "google.rw", "google.cz", "google.ru", "google.rs", "google.md", "google.co.id", "google.com.tj", "thinkwithgoogle.com", "googletagmanager.com", "golang.org", "tensorflow.org", "wikimedia.org", "wikipedia.org", "chrome.com", "android.com", "onedrive.com", "onedrive.live.com"];
var localTlds = {
	".localhost": 1,
	".test": 1
};
function to_dict(domains) {
	var domain_dict = {};
	for (var i = 0; i < domains.length; i++) {
		if (domains[i].endsWith(".")) {
			domains[i] = domains[i].slice(0, -1)
		}
		var url_list = domains[i].split('.');
		var domain_node = domain_dict;
		for (var j = url_list.length; j > 0; j--) {
			var node_name = url_list[j - 1];
			if (!domain_node.hasOwnProperty(node_name)) {
				if (j === 1) {
					domain_node[node_name] = true;
					break
				} else {
					domain_node[node_name] = {}
				}
			} else if (domain_node[node_name] === true) {
				break
			}
			domain_node = domain_node[node_name]
		}
	}
	return domain_dict
}
domainsUsingProxy = to_dict(domainsUsingProxy);
var hasOwnProperty = Object.hasOwnProperty;
var ipRegExp = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
function convertAddress(ipchars) {
	var bytes = ipchars.split('.');
	var result = ((bytes[0] & 0xff) << 24) | ((bytes[1] & 0xff) << 16) | ((bytes[2] & 0xff) << 8) | (bytes[3] & 0xff);
	return result
}
function testDomain(host, domain_dict) {
	var host_list = host.split('.') var domain_node = domain_dict
	for (var i = host_list.length; i > 0; i--) {
		var node_name = host_list[i - 1]
		if (domain_node.hasOwnProperty(node_name)) {
			if (domain_node[node_name] === true) {
				return true
			} else {
				domain_node = domain_node[node_name]
			}
		} else {
			return false
		}
	}
	return false
}
function isLocalTestDomain(domain) {
	var tld = domain.substring(domain.lastIndexOf('.'));
	if (tld === domain) {
		return false
	}
	return Object.hasOwnProperty.call(localTlds, tld)
}
var its_testdomain = {
	"free1.edge.itestspeed.xyz": "jp2.mzke5.buzz:443",
	"free2.edge.itestspeed.xyz": "us4.mzkservice.com:3389",
	"free3.edge.itestspeed.xyz": "us.fv.qqwx8.xyz:443"
};
function isTestSpeedDomain(host) {
	if (typeof its_testdomain[host] !== "undefined") {
		return "HTTPS " + its_testdomain[host] + ";"
	}
	return false
}
function isPrivateIp(ip) {
	return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) || /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) || /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) || /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) || /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(ip) || /^f[cd][0-9a-f]{2}:/i.test(ip) || /^fe80:/i.test(ip) || /^::1$/.test(ip) || /^::$/.test(ip)
}
function FindProxyForURL(url, host) {
	if (isPlainHostName(host) || isPrivateIp(host) || isLocalTestDomain(host) || host === 'localhost') {
		return direct
	}
	if (/itestspeed\.xyz$/ig.test(host)) {
		its = isTestSpeedDomain(host);
		if (its !== false) return its
	}
	if (!ipRegExp.test(host)) {
		if (testDomain(host, domainsUsingProxy)) {
			return proxy
		}
	}
	return direct
}
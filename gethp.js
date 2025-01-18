function J_get(name, url) {
    url = url || window.location.href;
    var start = url.indexOf(name + '=');
    if (start == -1) return '';
    var len = start + name.length + 1;
    var end = url.indexOf('&', len);
    if (end == -1) end = url.length;
    return decodeURIComponent(url.substring(len, end));
}

var id = J_get('id');
var gid = encodeURIComponent(id);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\[").replace(/[\]]/, "\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var getURL = getParameterByName('url');
var getIMG = getParameterByName('img');
var getKEY = getParameterByName('k1');
var getKEY2 = getParameterByName('k2');

if (!getURL || getURL === "#") {
    alert('URL tidak valid. Kembali ke halaman sebelumnya.');
    // Optionally, redirect back
    // window.history.back();
}

var play = getParameterByName('play') === "1";

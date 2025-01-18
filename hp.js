var dp = new DPlayer({
    container: document.getElementById('playerku'),
    theme: "#ffffff",
    loop: false,
    autoplay: true,
    hotkey: true,
    preload: "metadata",
    mutex: true,
    video: {
        quality: [{
            url: id,
            name: "nontonvoli.blogspot.com",
            type: 'auto',
        }],
        defaultQuality: 0,
        pic: 'https://bit.ly/4canQlj',
        referrerPolicy: "no-referrer"
    },
});

document.getElementById('playerku').oncontextmenu = function() {
    document.querySelector('.dplayer-menu').style.display = "none";
    document.querySelector('.dplayer-mask').style.display = "none";
    return false;
};

setTimeout(function() {
    dp.play();
}, 1000);

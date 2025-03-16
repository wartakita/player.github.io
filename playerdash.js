var playerInstance = jwplayer("player");
playerInstance.setup({
    playlist: [{
        "image": "",
        "sources": [{
            "default": true,
            "type": "dash",
            "file": atob(getURL),
            "drm": {
                "clearkey": {
                    "keyId": atob(getKEY),
                    "key": atob(getKEY2)
                }
            },
            "label": "0"
        }]
    }],
    logo: {
        file: "",
    },
    width: "100%",
    pipIcon: "enabled",
    height: "100%",
    aspectratio: "16:9",
    autostart: true,
    mute: false,
    cast: [],
    sharing: {
        link: ""
    },
});

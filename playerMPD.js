var playerInstance = jwplayer("player");
playerInstance.setup({
    playlist: [{
        image: getIMG || "",
        sources: [{
            default: true,
            type: "dash",
            file: atob(getURL),
            drm: {
                clearkey: {
                    keyId: atob(getKEY),
                    key: atob(getKEY2)
                }
            },
            label: "0"
        }]
    }],
    width: "100%",
    height: "100%",
    aspectratio: "16:9",
    autostart: play,
    mute: false,
    pipIcon: true,
    cast: {},
    sharing: {
        link: ""
    },
    logo: {
        file: ""
    }
});

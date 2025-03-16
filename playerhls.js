var playerInstance = jwplayer("player");

var encodedVideoParam = getParameter('video');
var videoFile = encodedVideoParam ? decodeBase64(encodedVideoParam) : 'default_video_url.mp4';

playerInstance.setup({
    playlist: [{
        title: " ",
        description: " ",
        image: " ",
        sources: [{
            default: true,
            file: videoFile,
            label: "HD Quality"
        }]
    }],
    width: "100%",
    height: "100%",
    aspectratio: "16:9",
    autostart: true,
    sharing: {
        link: window.location.href,
        sites: ["facebook", "twitter", "email", "whatsapp"]
    }
});

playerInstance.on('error', function(event) {
    console.log("Error occurred: ", event.message);
    alert("An error occurred while loading the video. Please try again later.");
});

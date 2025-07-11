document.addEventListener("DOMContentLoaded", function() {
    const serversDefault = [{
            name: "Server 1",
            embed: "https://example.com/embed1"
        },
        {
            name: "Server 2",
            embed: "https://example.com/embed2"
        },
        {
            name: "Server 3",
            embed: "https://example.com/embed3"
        }
    ];

    const serverList = document.getElementById('serverList');
    const iframe = document.querySelector("#pembed iframe");
    const playerLoad = document.querySelector(".playerload");
    let currentServerIndex = 0;
    let servers = [];

    function loadServer(index) {
        if (index >= servers.length) {
            playerLoad.style.display = "none";
            alert("All servers failed to load. Please try again later.");
            return;
        }

        const embedURL = servers[index].embed;
        playerLoad.style.display = "block";
        iframe.src = embedURL;

        iframe.onload = function() {
            playerLoad.style.display = "none";
        };

        iframe.onerror = function() {
            playerLoad.style.display = "none";
            alert(`Failed to load ${servers[index].name}. Trying next server...`);
            loadServer(index + 1);
        };

        document.querySelectorAll('.DagPlayOpt').forEach(opt => opt.classList.remove('on'));
        if (serverList.children[index]) {
            serverList.children[index].firstChild.classList.add('on');
        }
        currentServerIndex = index;
    }

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function decodeBase64(str) {
        try {
            return atob(str);
        } catch (e) {
            return str;
        }
    }

    function buildServerListFromUrls(urls) {
        urls.forEach((url, index) => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            div.className = 'DagPlayOpt';
            div.dataset.embed = url;
            div.innerHTML = `<i class="fas fa-play"></i> <span>Server ${index + 1}</span>`;
            li.appendChild(div);
            serverList.appendChild(li);

            div.addEventListener('click', function() {
                loadServer(index);
            });
        });
    }

    // Main logic to populate servers and build UI
    const embedParam = getParameterByName('embed');
    if (embedParam) {
        const decodedEmbedParam = decodeBase64(embedParam);
        // Split by comma and clean empty entries
        const embedUrls = decodedEmbedParam.split(',').map(u => u.trim()).filter(u => u);
        if (embedUrls.length > 0) {
            servers = embedUrls.map((url, idx) => ({
                name: `Server ${idx + 1}`,
                embed: url
            }));
            buildServerListFromUrls(embedUrls);
            loadServer(0);
        } else {
            // fallback to default servers if no valid URLs
            servers = serversDefault;
            serversDefault.forEach((server, index) => {
                const li = document.createElement('li');
                const div = document.createElement('div');
                div.className = 'DagPlayOpt';
                div.dataset.embed = server.embed;
                div.innerHTML = `<i class="fas fa-play"></i> <span>${server.name}</span>`;
                li.appendChild(div);
                serverList.appendChild(li);

                div.addEventListener('click', function() {
                    loadServer(index);
                });
            });
            loadServer(0);
        }
    } else {
        // No embed parameter present: use default servers
        servers = serversDefault;
        serversDefault.forEach((server, index) => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            div.className = 'DagPlayOpt';
            div.dataset.embed = server.embed;
            div.innerHTML = `<i class="fas fa-play"></i> <span>${server.name}</span>`;
            li.appendChild(div);
            serverList.appendChild(li);

            div.addEventListener('click', function() {
                loadServer(index);
            });
        });
        loadServer(0);
    }

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const timeString = now.toLocaleTimeString('en-GB', options);
        document.getElementById('timeDisplay').textContent = `Waktu Jakarta: ${timeString}`;
    }

    setInterval(updateTime, 1000);
    updateTime();
});

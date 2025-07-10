// Utility: Show toast notification
function showToast(message, bgClass = 'bg-success') {
    const toastContainer = document.getElementById('toastContainer');

    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white ${bgClass} border-0`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          `;

    toastContainer.appendChild(toastEl);

    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toastEl, {
        delay: 3500
    });
    bsToast.show();

    // Remove toast element after hidden
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function generateEmbed() {
    const inputUrl = document.getElementById('inputEmbed').value.trim();
    if (!isValidURL(inputUrl)) {
        showToast("Masukkan URL yang valid!", 'bg-danger');
        return;
    }
    const base64Encoded = btoa(inputUrl);
    const link = `https://embedplayerku.blogspot.com/?embed=${base64Encoded}`;
    const embedLink = document.getElementById('embedLink');
    embedLink.href = link;
    embedLink.innerText = link;
    showToast("Tautan embed berhasil dibuat!");
}

function resetEmbed() {
    document.getElementById('inputEmbed').value = '';
    const embedLink = document.getElementById('embedLink');
    embedLink.href = '#';
    embedLink.innerText = '';
}

function generateHLS() {
    const inputUrl = document.getElementById('inputHLS').value.trim();
    if (!isValidURL(inputUrl)) {
        showToast("Masukkan URL yang valid!", 'bg-danger');
        return;
    }
    const base64Encoded = btoa(inputUrl);
    const link = `https://goalhubplayer.blogspot.com/?video=${base64Encoded}`;
    const hlsLink = document.getElementById('hlsLink');
    hlsLink.href = link;
    hlsLink.innerText = link;
    showToast("Tautan HLS berhasil dibuat!");
}

function resetHLS() {
    document.getElementById('inputHLS').value = '';
    const hlsLink = document.getElementById('hlsLink');
    hlsLink.href = '#';
    hlsLink.innerText = '';
}

function generateMPD() {
    const inputUrl = document.getElementById('inputMPD').value.trim();
    const inputK1 = document.getElementById('inputK1').value.trim();
    const inputK2 = document.getElementById('inputK2').value.trim();

    if (!isValidURL(inputUrl)) {
        showToast("Masukkan URL MPD yang valid!", 'bg-danger');
        return;
    }
    if (inputK1 === '') {
        showToast("Masukkan nilai K1!", 'bg-danger');
        return;
    }
    if (inputK2 === '') {
        showToast("Masukkan nilai K2!", 'bg-danger');
        return;
    }

    const base64Url = btoa(inputUrl);
    const link = `https://mpdplayertv.blogspot.com/?url=${base64Url}&k1=${encodeURIComponent(inputK1)}&k2=${encodeURIComponent(inputK2)}`;

    const mpdLink = document.getElementById('mpdLink');
    mpdLink.href = link;
    mpdLink.innerText = link;
    showToast("Tautan MPD berhasil dibuat!");
}

function resetMPD() {
    document.getElementById('inputMPD').value = '';
    document.getElementById('inputK1').value = '';
    document.getElementById('inputK2').value = '';
    const mpdLink = document.getElementById('mpdLink');
    mpdLink.href = '#';
    mpdLink.innerText = '';
}

function copyToClipboard(elementId) {
    const el = document.getElementById(elementId);
    if (!el || !el.innerText) {
        showToast("Tidak ada tautan untuk disalin!", 'bg-danger');
        return;
    }
    navigator.clipboard.writeText(el.innerText).then(() => {
        showToast("Tautan berhasil disalin ke clipboard!");
    }).catch(() => {
        showToast("Gagal menyalin tautan!", 'bg-danger');
    });
}

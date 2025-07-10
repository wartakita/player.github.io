// Time updating function for time-display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', {
        hour12: false
    });
    document.getElementById('timeDisplay').textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// Video server switch logic
const buttons = document.querySelectorAll('.server-btn');
const iframe = document.getElementById('videoFrame');
const spinner = document.getElementById('spinner');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all btns
        buttons.forEach(b => {
            b.classList.remove('active');
            b.removeAttribute('aria-current');
        });
        // Add active to clicked btn
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');

        // Show spinner while loading
        spinner.style.display = 'flex';

        // Change iframe src from data-src of button clicked
        iframe.src = btn.getAttribute('data-src');
    });
});

// Hide spinner when iframe finished loading
iframe.addEventListener('load', () => {
    spinner.style.display = 'none';
});

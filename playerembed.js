// Fungsi cek apakah string base64 valid
    function isBase64(str) {
      if (!str || str.length === 0) return false;
      // regex base64 standar tanpa padding
      const base64regex = /^[A-Za-z0-9+/]+={0,2}$/;
      if (!base64regex.test(str)) return false;
      try {
        return btoa(atob(str)) === str;
      } catch (e) {
        return false;
      }
    }

    // Fungsi ambil param URL by name
    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Parsing parameter video sesuai skenario campuran base64 dan URL biasa yang dipisah koma
    function parseVideoParam(videoParam) {
      if (!videoParam) return [];

      // split parameter video berdasarkan koma, setiap bagian merupakan URL atau base64 encoded URL
      const parts = videoParam.split(',');

      const urls = parts.map(part => {
        part = part.trim();

        // jika sudah berbentuk URL (http atau https), langsung return
        if (part.startsWith('http://') || part.startsWith('https://')) {
          return part;
        }

        // jika base64 valid, decode dulu
        if (isBase64(part)) {
          try {
            return atob(part);
          } catch {
            return part; // fallback jika gagal decode
          }
        }
        // fallback, return string apa adanya
        return part;
      });

      // filter hapus string kosong dan hanya url valid minimal http/https
      return urls.filter(url => url && (url.startsWith('http://') || url.startsWith('https://')));
    }

    document.addEventListener("DOMContentLoaded", () => {
      const serverListEl = document.getElementById('serverList');
      const iframe = document.querySelector('#pembed iframe');

      // Ambil param video dari URL
      const videoParam = getParameterByName('video');
      const urls = parseVideoParam(videoParam);

      if (urls.length === 0) {
        serverListEl.innerHTML = '<li>Tidak ditemukan URL video yang valid.</li>';
        iframe.src = '';
        return;
      }

      // Membuat tombol server dari urls array
      urls.forEach((url, index) => {
        const li = document.createElement('li');
        // Label tombol menampilkan nomor server dan domain host URL agar jelas
        let label = `Server ${index + 1}`;
        try {
          const urlObj = new URL(url);
          label += ` (${urlObj.hostname.replace('www.', '')})`;
        } catch {}
        li.textContent = label;
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');
        li.style.userSelect = 'none';

        // Event klik pilih server dan load iframe
        li.addEventListener('click', () => {
          iframe.src = url;
          // Highlight active server
          document.querySelectorAll('#serverList li').forEach(el => el.classList.remove('active'));
          li.classList.add('active');
        });

        // Support keyboard enter/space to activate server button
        li.addEventListener('keydown', (evt) => {
          if (evt.key === 'Enter' || evt.key === ' ') {
            evt.preventDefault();
            li.click();
          }
        });

        serverListEl.appendChild(li);
      });

      // Auto klik server pertama supaya iframe langsung muncul
      serverListEl.firstChild.click();
    });

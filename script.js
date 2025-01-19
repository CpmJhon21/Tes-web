const shortenForm = document.getElementById('shortenForm');
const longUrlInput = document.getElementById('longUrl');
const resultDiv = document.getElementById('result');
const shortenedLink = document.getElementById('shortenedLink');

// Event listener untuk form submit
shortenForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const longUrl = longUrlInput.value;

    if (!longUrl) {
        alert('Mohon masukkan URL yang valid.');
        return;
    }

    // Masukkan URL ke dalam variabel go_url
    go_url = longUrl;

    // Script SnackLink (web-script.js) akan otomatis memproses URL
    processSnackLink(go_url);
});

// Fungsi untuk menampilkan hasil SnackLink
function processSnackLink(url) {
    if (url) {
        shortenedLink.href = go_url;
        shortenedLink.textContent = go_url;
        resultDiv.classList.remove('hidden');
    } else {
        alert('Gagal memproses URL. Coba lagi.');
    }
}

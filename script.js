// SnackLink API URL dan API Key
var go_url = 'https://moneyblink.com/';
var api = 'b906339219a9e278735328dc06c20e99434da67e';

// Fungsi untuk Base64 encode (menerima URL dan mengubahnya menjadi Base64)
function app_base64_encode(e) {
    return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, n) {
        return String.fromCharCode("0x" + n);
    }));
}

// Fungsi untuk mendapatkan host name dari URL
function app_get_host_name(e) {
    if (e === null || e === "") {
        return "";
    }
    var a = document.createElement("a");
    a.href = e;
    return a.hostname;
}

// Fungsi untuk memperpendek URL menggunakan SnackLink API
async function shortenUrl(url) {
    const encodedUrl = app_base64_encode(url);  // Mengencode URL menjadi Base64
    const apiUrl = `${go_url}full?api=${encodeURIComponent(api)}&url=${encodedUrl}&type=1`;  // URL API dengan parameter yang diperlukan

    try {
        const response = await fetch(apiUrl);  // Mengirim permintaan menggunakan fetch
        const data = await response.json();

        if (data.success) {
            return data.shortened_url;  // Jika berhasil, kembalikan URL pendek
        } else {
            throw new Error('Failed to shorten URL');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error while shortening URL');
    }
}

// Menangani pengiriman form
document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Mencegah form melakukan reload halaman

    const urlInput = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const shortenedUrl = document.getElementById('shortenedUrl');

    // Cek apakah URL valid
    if (!urlInput) {
        alert("Please enter a valid URL.");
        return;
    }

    const hostName = app_get_host_name(urlInput);  // Ambil host name dari URL

    // Jika host name ada, lanjutkan proses pemendekan
    if (hostName) {
        const shortened = await shortenUrl(urlInput);  // Panggil API untuk mendapatkan URL pendek

        if (shortened) {
            shortenedUrl.href = shortened;  // Masukkan URL pendek ke dalam anchor
            shortenedUrl.textContent = shortened;  // Tampilkan URL pendek
            resultDiv.classList.remove('hidden');  // Tampilkan hasil
        }
    } else {
        alert("Invalid URL, please try again.");
    }
});

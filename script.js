// Base64 encode function (as per the provided code)
function app_base64_encode(e) {
    return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, n) {
        return String.fromCharCode("0x" + n);
    }));
}

// Function to get host name from URL
function app_get_host_name(e) {
    if (e === null || e === "") {
        return "";
    }
    var a = document.createElement("a");
    a.href = e;
    return a.hostname;
}


// SnackLink API URL dan API Key
var go_url = 'https://moneyblink.com/';
var api = 'b906339219a9e278735328dc06c20e99434da67e';

// Fungsi untuk mendapatkan URL pendek
async function shortenUrl(url) {
    const encodedUrl = app_base64_encode(url);
    const apiUrl = `${go_url}shorten?api=${encodeURIComponent(api)}&url=${encodedUrl}`; // Menggunakan endpoint shorten

    try {
        const response = await fetch(apiUrl); // Menggunakan fetch untuk mendapatkan URL pendek
        const data = await response.json();

        if (data.success) {
            return data.shortened_url; // Mengambil URL pendek dari respons API
        } else {
            throw new Error('Failed to shorten URL');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error while shortening URL');
    }
}

// Handle form submission
document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const shortenedUrl = document.getElementById('shortenedUrl');

    // Cek apakah URL valid
    if (!urlInput) {
        alert("Please enter a valid URL.");
        return;
    }

    const hostName = app_get_host_name(urlInput);

    if (hostName) {
        // Dapatkan URL pendek dari API SnackLink
        const shortened = await shortenUrl(urlInput);

        if (shortened) {
            shortenedUrl.href = shortened;
            shortenedUrl.textContent = shortened;
            resultDiv.classList.remove('hidden');
        }
    } else {
        alert("Invalid URL, please try again.");
    }
});


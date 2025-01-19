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

// SnackLink API URL and API Key
var go_url = 'https://depositfiles.com/';
var api = 'b906339219a9e278735328dc06c20e99434da67e';

// Handle form submission
document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const shortenedUrl = document.getElementById('shortenedUrl');

    // Check if the URL is valid
    if (!urlInput) {
        alert("Please enter a valid URL.");
        return;
    }

    const hostName = app_get_host_name(urlInput);
    
    // Ensure that the URL has a valid hostname
    if (hostName) {
        // Create the shortened URL using the Snacklink API
        const encodedUrl = app_base64_encode(urlInput);
        const apiUrl = `${go_url}full?api=${encodeURIComponent(api)}&url=${encodedUrl}&type=1`;

        // Set the result and show it
        shortenedUrl.href = apiUrl;
        shortenedUrl.textContent = apiUrl;
        resultDiv.classList.remove('hidden');
    } else {
        alert("Invalid URL, please try again.");
    }
});

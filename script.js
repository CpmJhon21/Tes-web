const shortenForm = document.getElementById('shortenForm');
const longUrlInput = document.getElementById('longUrl');
const resultDiv = document.getElementById('result');
const shortenedLink = document.getElementById('shortenedLink');

// Your API Key from SnackLink.id
const API_KEY = 'b906339219a9e278735328dc06c20e99434da67e';
const API_URL = 'https://moneyblink.com/';

shortenForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const longUrl = longUrlInput.value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({ longUrl })
        });

        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }

        const data = await response.json();
        const shortUrl = data.shortUrl;

        // Display the shortened URL
        shortenedLink.href = shortUrl;
        shortenedLink.textContent = shortUrl;
        resultDiv.classList.remove('hidden');
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

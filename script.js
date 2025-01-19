document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const shortenedUrl = document.getElementById('shortenedUrl');

    if (!urlInput) {
        alert("Please enter a valid URL.");
        return;
    }

    try {
        const response = await fetch(`/shorten?url=${encodeURIComponent(urlInput)}`);
        const data = await response.json();

        if (data && data.shortenedUrl) {
            shortenedUrl.href = data.shortenedUrl;
            shortenedUrl.textContent = data.shortenedUrl;
            resultDiv.classList.remove('hidden');
        } else {
            alert('Error shortening URL');
        }
    } catch (error) {
        alert('Error occurred while shortening URL');
    }
});

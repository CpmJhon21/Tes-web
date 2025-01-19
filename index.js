const express = require('express');
const fetch = require('node-fetch');  // Pastikan untuk menginstal node-fetch (npm install node-fetch)
const app = express();
const port = 3000;

const go_url = 'https://moneyblink.com/';
const api = 'b906339219a9e278735328dc06c20e99434da67e';

// Endpoint untuk memperpendek URL
app.get('/shorten', async (req, res) => {
    const { url } = req.query;  // Ambil URL dari query parameter
    if (!url) {
        return res.status(400).send('URL is required');
    }

    const encodedUrl = Buffer.from(url).toString('base64');  // Encode URL ke base64
    const apiUrl = `${go_url}full?api=${api}&url=${encodedUrl}&type=1`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Jika berhasil, kirim URL pendek ke pengguna
        if (data && data.shortened_url) {
            return res.json({ shortenedUrl: data.shortened_url });
        } else {
            return res.status(500).send('Error shortening URL');
        }
    } catch (error) {
        return res.status(500).send('Error making request to Snacklink API');
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

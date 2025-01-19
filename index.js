const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// API Key dan URL
const apiKey = 'b906339219a9e278735328dc06c20e99434da67e';
const goUrl = 'https://moneyblink.com/';
const appDomains = ['moneyblink.com']; // Menambahkan domain yang digunakan

// Middleware untuk melayani file statis (HTML dan CSS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint untuk mempersingkat URL
app.post('/shorten', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL tidak disediakan.' });
    }

    try {
        const response = await axios.post('https://snacklink.id/api', { url }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.data && response.data.short_url) {
            res.status(200).json({ short_url: response.data.short_url });
        } else {
            res.status(500).json({ error: 'Gagal mempersingkat URL.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Jalankan server di port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

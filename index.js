const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/getRobloxThumbnail', async (req, res) => {
    const userId = req.query.userId || '1'
    const url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.data && data.data.length > 0) {
            const imageUrl = data.data[0].imageUrl
            res.json({ success: true, imageUrl: imageUrl })
        } else {
            res.status(404).json({ success: false, imageUrl: 'No imageUrl found.' })
        }
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error fetching imageUrl.', error: error.message})
    }
});

app.get('/', (req, res) => {
    res.send('Replit server is running and ready for Roblox Studio requests!\nThis replit was created by Dashiel (@KingDashiei) on Roblox!')
});

app.listen(port, () => {
    console.log(`Server listening to ${port}`)
});
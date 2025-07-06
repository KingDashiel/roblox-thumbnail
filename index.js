const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/getRobloxThumbnail', async (req, res) => {
    const userId = req.query.userId || '1'
    const headshot = req.query.headshot
    const url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.data && data.data.length > 0) {
            if (!headshot) {
                url = 'https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png'
            }
            
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
    res.setHeader('Content-Type', 'text/plain'); 
    
    res.send(`
=========================================
API ENDPOINT USAGE GUIDE
=========================================

This API Endpoint allows you to easily grab a player's Roblox thumbnail.

-----------------------------------------
REQUIRED PARAMETERS
-----------------------------------------
To successfully retrieve a player's thumbnail URL, you need to provide both of these parameters in your request:

- UserID: The unique numerical identifier for the Roblox player.
  (Example: 123456789)

- Headshot or Full Body Shot: A boolean value (true or false) to specify the type of thumbnail.
  (Set to 'true' for a headshot, 'false' for a full body shot.)

-----------------------------------------
EXAMPLE API REQUEST URL
-----------------------------------------
Here's an example of the final link you'll use in your URL bar or in your Roblox Studio HttpService request:

https://roblox-thumbnail.onrender.com/getRobloxThumbnail?userId=USERID&headshot=true

=========================================
CREDITS
=========================================
This code was created by Dashiel (@KingDashiei) on Roblox!
`);
});

app.listen(port, () => {
    console.log(`Server listening to ${port}`)
});
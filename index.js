const express = require('express')
const app = express()

app.get('/', (req, res) => {
    if(req.headers.host === 'talviruusu.com') {
        res.send('hello talviruusu')
    } else if(req.headers.host === 'talviruusu.com') {
        req.send('hello siivousville')
    }
})

app.listen(3000, () => console.log("Server running"))
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(req)
    if(req.headers.host === 'talviruusu.com') {
        res.send('hello talviruusu')
    } else if(req.headers.host === 'talviruusu.com') {
        req.send('hello siivousville')
    }
})

app.listen(80, () => console.log("Server running"))
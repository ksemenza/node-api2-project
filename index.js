const express = require('express')
const server = express()
server.use(express.json())

const postRoutes = require('./posts/postRoutes')

server.use('/api/posts', postRoutes)
server.get('/',(req, res) => {
    res.send('Welcome to the blog')
})

const PORT = 9000;

server.listen(PORT, ()=> console.log(`server running on port${PORT}`))
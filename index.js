require('dotenv').config();
const express = require('express')
const cors = require('cors');
const server = express()
server.use(express.json())
server.use(cors());

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}



const postRoutes = require('./posts/postRoutes')

server.use('/api/posts', postRoutes)
server.get('/',(req, res) => {
    res.send('Welcome to the blog')
})

const PORT = 9000;

server.listen(PORT, ()=> console.log(`server running on port${PORT}`))
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);

// Config Express Application
app.use(express.static('public'))
app.use(express.json())

console.log(`- Server is running on ${process.env.NODE_ENV ? 'production' : 'development'}.`)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        }
        else next();
    })
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000','http://192.168.1.11:3000','http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// ROUTES REQ
const taskRoutes = require('./api/task/task.routes')


// USING ROUTES
app.use('/api/task', taskRoutes)

const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})
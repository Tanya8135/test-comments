import app from './app.js'
import http from 'http'
import db from './models/schemas/db.js'

const PORT = 3000

db.then(() => {
    const server = http.createServer(app)

    server.listen(PORT, () => { /* at http://localhost:3000 добавила для удобства */
        console.log(`Server running at http://localhost:3000. Use our API on port: ${PORT}`);
    });
}).catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
})
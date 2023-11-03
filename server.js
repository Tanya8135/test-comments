const app = require('./app')
const http = require('http')
const server = http.createServer(app)
const db = require('./models/schemas/db')

const PORT = 3000

db.then(() => {
    server.listen(PORT, () => { /* at http://localhost:3000 добавила для удобства */
        console.log(`Server running at http://localhost:3000. Use our API on port: ${PORT}`);
    });
}).catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
})
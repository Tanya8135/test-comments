import app from './app.js';
import http from 'http';
import db from './models/schemas/db.js';
import { WebSocketServer } from 'ws';

const PORT = 3000;

db.then(async () => {
    const server = http.createServer(app);
    const wss = new WebSocketServer({ noServer: true });

    // Отримання коментарів від клієнтів
    wss.on('connection', (ws) => {
        console.log('Новий клієнт підключився до WebSocket');

        ws.on('message', async (message) => {
            try {
                const newComment = JSON.parse(message);

                // Збереження коментаря у базі даних
                const newText = new Text({
                    name: newComment.name,
                    text: newComment.text
                });

                await newText.save();

                // Розсилка коментаря на всіх підключених клієнтів
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(newComment));
                    }
                });
            } catch (error) {
                console.error('Помилка при обробці коментаря: ', error);
            }
        });

        ws.on('close', () => {
            console.log('Клієнт відключився від WebSocket');
        });
    });

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:3000. Use our API on port: ${PORT}`);
    });
}).catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
});
const WebSocket = require('ws');

// Функция для отправки сообщения с задержкой
function sendMessage(socket, message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            socket.send(String.fromCharCode(message));
            resolve();
        }, 1000);
    });
}

// Создаем WebSocket
const server = new WebSocket.Server({ port: 8080 });

console.log('Start');

// Подключение клиента
server.on('connection', (socket) => {
    // Клиент подключён
    console.log('Client connected');

    // Обработчик входящих сообщений
    socket.on('message', async (message) => {
        console.log('Received: ' + message);
        for (const char of message) {
            await sendMessage(socket, char);
        }
    });

    // Отключение клиента
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});
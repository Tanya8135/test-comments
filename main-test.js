import io from 'socket.io-client';

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.btn');
    const board = document.querySelector('.board');
    const nameInput = document.querySelector('.name');
    const textInput = document.querySelector('.text_commit');

    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
        console.log('Підключено до сервера WebSocket');
    });

    socket.on('message', (message) => {
        console.log(`Отримано повідомлення від сервера: ${message}`);
    });

    function createCommentElement(newComment) {
        const nameDiv = document.createElement('div');
        nameDiv.innerText = newComment.name;
        const commentDiv = document.createElement('div');
        commentDiv.innerText = newComment.text;

        return [nameDiv, commentDiv];
    }

    socket.on('disconnect', () => {
        console.log('З\'єднання з сервером WebSocket втрачено');
    });

    sendButton.addEventListener('click', () => {
        const newComment = {
            name: nameInput.value,
            text: textInput.value,
        };

        // Відправка коментаря на сервер
        socket.emit('sendMessage', newComment);

        // Очищення полів вводу
        nameInput.value = '';
        textInput.value = '';
    });

    socket.on('newComment', (newComment) => {
        const [nameDiv, commentDiv] = createCommentElement(newComment);
        board.appendChild(nameDiv);
        board.appendChild(commentDiv);
    });

    socket.on('confirmation', (message) => {
        const confirmationMessage = document.createElement('div');
        confirmationMessage.innerText = message;
        document.body.appendChild(confirmationMessage);
    });

    socket.on('error', (error) => {
        console.error('Помилка відправлення коментаря: ', error);
    });
});
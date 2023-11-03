const fetch = require('node-fetch')

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.btn')

    sendButton.addEventListener('click', () => {
        const nameInput = document.querySelector('.name')
        const textInput = document.querySelector('.text_commit')

        const newComment = {
            name: nameInput.value,
            text: textInput.value,
        }

        fetch('/api/text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => response.json())
            .then((data) => {
                // Відобразити підтвердження додавання коментаря
                const confirmationMessage = document.createElement('div')
                confirmationMessage.innerText = 'Comment added successfully'
                document.body.appendChild(confirmationMessage)

                // Оновити інтерфейс, наприклад, вивести новий коментар на сторінці
                const board = document.querySelector('.board')
                const nameDiv = document.createElement('div')
                nameDiv.innerText = newComment.name
                const commentDiv = document.createElement('div')
                commentDiv.innerText = newComment.text
                board.appendChild(nameDiv)
                board.appendChild(commentDiv)
            })
            .catch((error) => {
                console.error('Помилка відправлення коментаря: ', error)
            })
    })
})

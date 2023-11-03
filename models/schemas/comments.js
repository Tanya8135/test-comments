const mongoose = require('mongoose')
const { Schema, model } = mongoose

const textSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name"]
        },
        text: {
            type: String,
            required: [true, "Send message"]
        }
    },
    { versionKey: false, timestamps: true }
)

const Text = model('comment', textSchema)

module.exports = Text
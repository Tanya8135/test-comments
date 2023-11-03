const express = require('express')
const router = express.Router()

const Text = require('../../models/schemas/comments')
const textSchema = require('../../models/validation/valid-text')

router.post('/', async (req, res, next) => {
    const textValidation = textSchema.validate(req.body)

    if (textValidation.error) {
        return res.status(400).json({ message: 'Validation error', details: textValidation.error.details })
    }

    const { name, text } = req.body

    const newText = new Text({
        name,
        text
    })

    try {
        await newText.save()
        return res.status(201).json({ comment: newText })
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    const { id } = req.params;

    const deletedComment = await Text.findByIdAndRemove(id);

    try {
        if (deletedComment) {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: {
                    message: "Comment deleted",
                },
            });
        } else {
            return res.status(404).json({
                status: "error",
                code: 404,
                message: "Comment not found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
});


module.exports = router
// const Text = require('../models/comments')


// const deleteComments = async (req, res, next) => {
//     const { id } = req.params
//     const { name, text } = req.body

//     try {
//         const deletedComment = await Text.deleteComments(id)

//         if (deletedComment) {
//             return res.status(200).json({
//                 status: "success",
//                 code: 200,
//                 data: {
//                     name: name,
//                     text: text,
//                     message: "delete comment"
//                 }
//             })
//         } else {
//             return res.status(404).json({
//                 status: "error",
//                 code: 404,
//                 message: "Not found"
//             })
//         }
//     } catch (err) {
//         return res.status(500).json({
//             status: "error",
//             code: 500,
//             message: 'Internal Server Error'
//         })
//     }
// }

// module.exports = deleteComments
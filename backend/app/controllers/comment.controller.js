const db = require("../../models");
const Comment = db.Comment;
const User = db.User;
const sq = db.sequelize;
const Op = db.Sequelize.Op;
const jwt = require("../midleware/auth.midleware");
const { sequelize, user } = require("../../models");

exports.createComment = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    return;
    }
        const comment = {
        content: req.body.content,
        UserId:req.userId,
        messageId:req.body.messageId,
        };
        createComment(res,comment);    
};

exports.findAllCommentById = (req, res) => {
    const id = req.userId;
Comment.findAll({
    where: { messageId: id },
    limit: 10
})
.then(data => {
    res.send(data);
})
.catch(err => {
    res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving messages."
    });
});
}
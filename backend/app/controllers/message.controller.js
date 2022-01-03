const db = require("../../models");
const Message = db.Message;
const User = db.User;
const sq = db.sequelize;
const Op = db.Sequelize.Op;
const jwt = require("../midleware/auth.midleware");
const { sequelize, user } = require("../../models");
// Create and Save a new Messages
exports.createMessage = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    return;
    }
    if(req.file == '' || req.file == null){
        const message = {
            content: req.body.content,
            attachment : '',
            UserId:req.userId,
            likes: 0,
            messageId:req.body.messageId,
            userLiked:'',
        };
        createMessage(res,message);
    }else {
        const message = {
            content: req.body.content,
            attachment :  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            UserId:req.userId,
            likes: 0,
            messageId:req.body.messageId,
            userLiked:'',
        };

        createMessage(res,message);
    }
    
};
  
// Retrieve all Messagess from the database.
 exports.findAllMessage = async (req, res) => {

    var order   = req.query.order;
    Message.findAll({ limit: 10, order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']]  } ,{include: [{model: User,required: true}]})
        .then(data => {
            res.send(data);
            })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Messages."
        });
    });
};

// Update a Messages by the id in the request
exports.modifyMessage = (req, res) => {
    const id = req.params.id;

    Message.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "Message was updated successfully."
        });
        } else {
            res.send({
            message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Message with id=" + id
        });
    });
};

// Delete a Messages with the specified id in the request
exports.deleteMessage = (req, res) => {
    const id = req.params.id;

    Message.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "Message was deleted successfully!"
        });
        } else {
            res.send({
            message: `Cannot delete Message with id=${id}. Maybe Message was not found!`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Message with id=" + id
        });
    });
};

//find all message by id

exports.findAllById = (req, res) => {
        const id = req.userId;
    Message.findAll({
        where: { userId: id },
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

//Likes

exports.like =(req,res,next)=>{
    let userId= req.body.userId;
    let id = req.body.sendLike.id;       
            Message.findOne({where: { id: id }})
                .then(message => {       
                    if(message.userLiked.split(",").includes(userId + ",")){
                        Message.decrement('likes',{where: { id: id }});
                        let userIds = message.userLiked.replace("," + userId + "," , "," );
                        Message.update({userLiked: `${userIds}`},{where: { id: id }})
                        // Message.destroy({userLiked: `${userId}`},{where: { id: id }})
                        .then(data => {
                            res.send(data)
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving messages."
                            });
                        });
                    }else if(message.userLiked.includes(userId)) {
                        Message.decrement('likes',{where: { id: id }});
                        let userIds = message.userLiked.replace(userId,"" );
                        Message.update({userLiked: `${userIds}`},{where: { id: id }})
                        // Message.destroy({userLiked: `${userId}`},{where: { id: id }})
                        .then(data => {
                            res.send(data)
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving messages."
                            });
                        });
                    }else{
                        Message.increment('likes',{where: { id: id }});
                        
                        if(message.userLiked == ""){
                            let userIds = userId;
                            Message.update({userLiked: `${userIds}`},{where: { id: id }})
                            .then(data => {
                                res.send(data)
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while retrieving messages."
                                });
                            });
                        }else{
                            let userIds = message.userLiked + "," + userId + ",";
                            Message.update({userLiked: `${userIds}`},{where: { id: id }})
                            .then(data => {
                                res.send(data)
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while retrieving messages."
                                });
                            });
                        }
                        
                    }
                })
            }
async function getUsernameFromMessage(data) {
    let dataWitdhUsername = [];
    await data.forEach((message, index) => {
        dataWitdhUsername.push(message);
        User.findOne({ id: message.userId })
            .then(user => {
                dataWitdhUsername[index].dataValues.username = user.username;
            }).catch(err => {
                res.status(500).json(err);
            });
        });
        console.log(dataWitdhUsername);
        return dataWitdhUsername
}

function createMessage(res, message) {
    Message.create(message)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Message."
            });
        });
}

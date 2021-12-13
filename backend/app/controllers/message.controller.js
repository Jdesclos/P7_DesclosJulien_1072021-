const db = require("../models");
const Message = db.message;
const Op = db.Sequelize.Op;
const jwt = require("../midleware/auth.midleware")
// Create and Save a new Messages
exports.createMessage = (req, res) => {
    if (!req.body.post.content) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    return;
    }
    const message = {
        content: req.body.post.content,
        attachment : req.body.post.attachment,
        userId:req.userId,
        likes: 0,
        messageId:req.body.post.messageId,
        userLiked:'',
    };
    console.log(message);
    Message.create(message)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Message."
        });
    })
};

// Retrieve all Messagess from the database.
exports.findAllMessage = (req, res) => {

    var order   = req.query.order;
    Message.findAll({ limit: 10, order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']]  })
        .then(data => {
           let posts = groupCommentByPost(data)
           console.log(posts);
            //requete user id dans data
            res.send(posts);
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
        console.log(id);
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
    console.log(req.body);
    let userId= req.body.userId;
    let like = req.body.sendLike.like;
    let id = req.body.sendLike.id;
    switch(like){
        case 1 :
            Message.findOne({ _id: id })
            .then((message) => {
            if(message.userLiked.includes(userId)){
              res.status(200).json({message:`L'utilisateur a dejà liké cette message`})
            }
            else
            {Message.update({_id: id}, {$push: {userLiked: userId},$inc:{likes: +1}})
            .then(()=>res.status(200).json({message: `J'aime`}))
            .catch(console.log(Message),(error)=>res.status(400).json({error}))}
          })
        break;
      case 0 :
          Message.findOne({ _id: id })
            .then((message) => {
              if (message.userLiked.includes(userId)) {
                Message.update({ _id: id }, { $pull: { userLiked: userId }, $inc: { likes: -1 }})
                  .then(() => res.status(200).json({ message: `Neutre` }))
                  .catch((error) => res.status(400).json({ error }))
              }
            })
            .catch((error) => res.status(404).json({ error }))
        break;
    }
  };

function groupCommentByPost(posts){
    let response= [];
    posts.forEach(message => {
        const comment = posts.filter(m => message.id === m.messageId);
        message.dataValues.comments = comment;
        response.push(message);      
    });
    // response = response.filter(post => post.messageId !== null);
    console.log(response);
    return response;
}
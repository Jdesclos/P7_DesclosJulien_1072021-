const db = require("../models");
const User = db.user;
const jwt = require('../midleware/auth.midleware');
const bcrypt = require('bcrypt');

const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

exports.register = (req, res, next) => {
    let email    = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio      = req.body.bio;
    let profilePicture = req.body.profilePicture;
    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (username.length >= 13 || username.length <= 4) {
        return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ 'error': 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
    }
    bcrypt.hash(password, 10)
    .then(hash => {
        const user = ({
            email: email,
            username:username,
            password: hash,
            bio:bio,
            profilePicture: profilePicture,
            isAdmin: false
        });
        User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the User."
            });
        })
    })
};

exports.login = (req,res, next) => {
    let email    = req.body.email;
    let password = req.body.password;
    let userId = jwt.userId;

    if (email == null ||  password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }
    User.findOne({
        attributes: [ 'id', 'email', 'username', 'bio' ],
        where: { id: userId }
    })
    .then (user => {
        if(!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, user.password)
        .then(valid => {
            if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(//création d'un token d'authentification
                { userId: user._id },
                process.env.TOKEN_SECRET,
                { expiresIn: '24h' }
            )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
};

exports.modifyUser = (req, res, next) => {
    const id = req.params.id;

    User.update(req.body, {
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

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
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
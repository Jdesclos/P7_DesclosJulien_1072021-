module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true,
            allowNull: false
        },
        username:{ 
            type:Sequelize.STRING,
            required: true,
            unique: true,
            allowNull: false
            },
        password : {
            type: Sequelize.STRING,
            required: true,
            allowNull: false
        },
        bio: {
            type: Sequelize.STRING,
            allowNull: true
        },
        isAdmin: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        profile_Picture: {
            allowNull: true,
            type: Sequelize.STRING,
            defaultValue:"../../images/profile_picture/default.png"
        }
    });

    return User;
};
const User = require('./user.model.js')

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      attachment:{ 
          type:Sequelize.STRING
        },
      messageId : {
        type: Sequelize.INTEGER
     },
      likes: {
        type: Sequelize.INTEGER,
        default: 0
     },
     userLiked: {
       type: Sequelize.STRING,
       default:""
     }
    });
    // Message.hasOne(User,{foreignKey:'userId'});

    // Message.associate = models => {
      
    //   Message.belongsTo(User, {
    //     foreignKey: {
    //       allowNull: false,
    //       foreignKey : 'user_id'
    //     }
    //   })
    // }
  
    return Message;
  };
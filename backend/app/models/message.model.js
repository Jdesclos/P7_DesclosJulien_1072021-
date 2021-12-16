

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
      userId : {
          type: Sequelize.INTEGER
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
     }},
     {
      classMethods: {
        associate: function(models){
          models.Message.belongsTo(models.User, {
            foreignKey:{
              allowNull: false
            }
          })
        }
      }
    });
  
    return Message;
  };
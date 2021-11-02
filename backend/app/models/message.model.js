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
      }
    });
  
    return Message;
  };
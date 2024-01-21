// models/comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      text: DataTypes.TEXT,
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User);
      Comment.belongsTo(models.Post);
    };
  
    return Comment;
  };
const User = require('./User');
const Blogs =require('./Blogs');
const Sports =require('./Sports');

User.hasMany(Blogs, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blogs.belongsTo(User, {
    foreignKey: 'user_id'
});

Sports.belongsTo(Blogs, {
    foreignKey: 'sports_id',
    onDelete: 'CASCADE',
  });

module.exports = { User, Blogs, Sports };

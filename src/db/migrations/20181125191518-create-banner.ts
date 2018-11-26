import Sequelize from 'sequelize';
module.exports = {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.createTable('Banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      topicId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Topic',
          key: 'id',
          as: 'topicId'
        }
      }
    });
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.dropTable('Banners');
  }
};

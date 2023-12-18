'use.strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    ALTER TABLE Users
    MODIFY COLUMN createdAt DATETIME NOT NULL    
    `);

    await queryInterface.sequelize.query(`
    ALTER TABLE Users
    MODIFY COLUMN updatedAt DATETIME NOT NULL    
    `);
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};


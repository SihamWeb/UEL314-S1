'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    ALTER TABLE Users
    MODIFY COLUMN createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP    
    `);
     
    await queryInterface.sequelize.query(`
    ALTER TABLE Users
    MODIFY COLUMN updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP    
    `);
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};


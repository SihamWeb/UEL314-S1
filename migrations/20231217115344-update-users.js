'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    ALTER TABLE Users
    MODIFY COLUMN id INT auto_increment PRIMARY KEY;    
    `);
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};

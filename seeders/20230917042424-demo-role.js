'use strict';
const {v4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [
      {
        id: v4(),
        name: 'user'
      },
      {
        id: v4(),
        name: 'admin'
      }
        
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Roles', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};

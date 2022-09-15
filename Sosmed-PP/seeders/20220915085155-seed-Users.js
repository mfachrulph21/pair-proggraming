'use strict';
const fs = require('fs');
const hashPassword = require('../helpers/password');

module.exports = {
   up (queryInterface, Sequelize) {

    let dataUsers = JSON.parse(fs.readFileSync('./users.json','utf-8'));

    dataUsers.forEach((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPassword(el.password)

    })

    return queryInterface.bulkInsert('Users', dataUsers, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

   down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

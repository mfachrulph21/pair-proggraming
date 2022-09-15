'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('Profiles', 'followers', { transaction: t }),
          queryInterface.removeColumn('Profiles', 'following', { transaction: t })
      ])
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.addColumn('Profiles', 'followers', {
              type: Sequelize.INTEGER
          }, { transaction: t }),
          queryInterface.addColumn('Profiles', 'following', {
              type: Sequelize.INTEGER,
          }, { transaction: t })
      ])
    })
  }
};

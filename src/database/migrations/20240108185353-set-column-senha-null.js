"use strict"

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("usuarios", "senha", {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("usuarios", "senha", {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },
}

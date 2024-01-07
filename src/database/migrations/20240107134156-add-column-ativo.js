"use strict"

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("usuarios", "ativo", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    })
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("usuarios", "ativo")
  },
}

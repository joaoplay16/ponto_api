"use strict"

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("usuarios", "cargo", {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: "colaborador",
      after: "nome",
    })
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("usuarios", "cargo")
  },
}

"use strict"

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("usuarios", "criado_em", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
      after: "celular",
    })
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("usuarios", "criado_em")
  },
}

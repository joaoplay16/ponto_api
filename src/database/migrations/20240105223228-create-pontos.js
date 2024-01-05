"use strict"

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
    */
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("pontos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hora_entrada: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      hora_saida: {
        type: Sequelize.TIME,
        allowNull: true,
      }
    })
  },

  /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} Sequelize
     * @returns {Promise<any>}
    */
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("pontos")
  },
}

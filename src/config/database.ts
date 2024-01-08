module.exports = {
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
  timezone: '-03:00', // for writing to database
}

require("dotenv").config();
const { DATABASE_URL } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getUsers: async (req, res) => {
    const response = await sequelize.query(`SELECT * FROM users`);
    res.status(200).send(response[0]);
  },
  createUser: async (req, res) => {
    const { firstName, lastName, email, avatar } = req.body;
    const response = await sequelize.query(
      `INSERT INTO users (first_name, last_name, email, avatar)
      VALUES ('${firstName}', '${lastName}', '${email}', '${avatar}')`
    );
    res.status(200).send(response);
  },
  updateUser: async (req, res) => {
    const { firstName, lastName, email, avatar, modalId } = req.body;
    const response = await sequelize.query(
      `UPDATE users
        SET
        first_name = '${firstName}',
        last_name = '${lastName}',
        email = '${email}',
        avatar = '${avatar}'
        
        WHERE '${modalId}' = id`
    );
    res.status(200).send(response[0][0]);
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    const response = await sequelize.query(
      `DELETE FROM users WHERE id = '${id}'`
    );
    res.status(200).send(response);
  },
};

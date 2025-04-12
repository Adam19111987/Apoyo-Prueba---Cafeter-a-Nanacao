const { faker } = require('@faker-js/faker');
const jwt = require("jsonwebtoken");



const generateToken = () => {
  const email = faker.internet.email();
  return jwt.sign({ email }, "Secreto" , {
    expiresIn: "1h",
  });
};
module.exports = {generateToken} ;
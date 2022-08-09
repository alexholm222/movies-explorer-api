const {
  MONGOD_SERVER,
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  MONGOD_SERVER, PORT, NODE_ENV, JWT_SECRET,
};

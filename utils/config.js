const {
  MONGOD_SERVER = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  MONGOD_SERVER, PORT, NODE_ENV, JWT_SECRET,
};

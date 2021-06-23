const mongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const state = {
  db: null,
};
module.exports.connect = function (done) {
  const dbname = "todo";

  mongoClient.connect(
    process.env.mongo_url,
    { useUnifiedTopology: true },
    (err, data) => {
      if (err) return done(err);
      state.db = data.db(dbname);
      done();
    }
  );
};

module.exports.get = () => {
  return state.db;
};

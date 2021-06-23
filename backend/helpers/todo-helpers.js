const { ObjectId } = require("mongodb");
const db = require("../config/connection");
module.exports = {
  addTodo: (data) => {
    db.get().collection("todos").insertOne(data);
  },
  getTodo: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("todos")
        .find()
        .toArray()
        .then((res) => {
          console.log("todos >>>", res);
          resolve(res);
        });
    });
  },
  removeTodo: (todoId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("todos")
        .removeOne({ _id: ObjectId(todoId) })
        .then(() => {
          resolve({ deleteStatus: true });
        });
    });
  },
  editTodo: (todoId, newText) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("todos")
        .updateOne(
          { _id: ObjectId(todoId) },
          {
            $set: {
              text: newText,
            },
          }
        )
        .then(() => {
          resolve({ updateTodo: true });
        });
    });
  },
};

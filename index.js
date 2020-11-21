const express = require("express");
const TodoModel = require("./models/TodoModel");
const bodyParser = require("body-parser");
const cors = require("cors");

const jsonParser = bodyParser.json();

const app = express();

app.use(cors());

app.get("/", (_req, res) => {
  res.json({
    message: "ok",
  });
});

app.get("/todos", async (req, res) => {
  const { filter = {} } = req.query;

  const documents = await TodoModel.find({
    ...filter,
    description: { $regex: new RegExp(`${filter.description || ""}`, "i") },
  });

  res.json(documents);
});

app.post("/todos", jsonParser, (req, res) => {
  const { description } = req.body;

  TodoModel.create({
    description,
    done: false,
  }).then((document) => {
    res.json(document);
  });
});

app.post("/todos/:id/toggle", async (req, res) => {
  const { id } = req.params;

  try {
    const document = await TodoModel.findById(id);

    document.done = !document.done;

    await document.save();

    res.json(document);
  } catch (e) {
    console.error(e);
    res.send(404);
  }
});

app.listen(8080, () => {
  console.log("App listening on port 8080");
});

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Yourpass1@#",
  database: "employees",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM employee_info";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const q = "INSERT INTO employee_info(`username`, `name`, `email`) VALUES (?)";

  const values = [
    req.body.username,
    req.body.name,
    req.body.email,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM employee_info WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "UPDATE employee_info SET `username`= ?, `name`= ?, `email`= ? WHERE id = ?";

  const values = [
    req.body.username,
    req.body.name,
    req.body.email,
  ];

  db.query(q, [...values,userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8801, () => {
  console.log("Connected to backend.");
});

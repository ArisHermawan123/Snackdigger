const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("pg").Pool;
// const response = require("../backend/config/response.js");

app.use(express.json());
app.use(cors());
require("dotenv").config();

const relation = new pool({
  user: process.env.USER,
  host: process.env.HOSTONLY,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

app.get("/datas", async (req, res) => {
  try {
    const getData = await relation.query(`select * from datas`);
    return res.status(200).json({ data: getData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// app.get("/users", async (req, res) => {
//   try {
//     const sql = "select description from datas";
//     relation.query(sql, (err, fields) => {
//       response(200, fields, "Data berhasil di kirim", res);
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/coba", async (req, res) => {
//   try {
//     const sql1 = "select * from datas where id = 2  ";
//     relation.query(sql1, (err, fields) => {
//       response(200, fields.rows, "masuk gaes", res);
//     });
//   } catch (error) {}
// });

app.post("/upload", async (req, res) => {
  const { description } = req.body;

  try {
    const user = await relation.query(`insert into datas (description) values('${description}')`);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/update", async (req, res) => {
  try {
    const user = await relation.query(`update datas set description = '' where id = 1`);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/users", async (req, res) => {
  try {
    const user = await relation.query(`delete from datas where id = 4`);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(4400, () => console.log(`server running on port 4400`));

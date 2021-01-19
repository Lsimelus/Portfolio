const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")

const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "testdb"
});

//middleware
app.use(cors())
app.use(express.json())

app.post("/todos", async (req, res) => {
    console.log("From body")
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo1 (email, name, phone, message) VALUES($1, $2, $3, $4) RETURNING *",
            [req.body.email, req.body.name, req.body.phone, req.body.message]
        )
        res.json(newTodo)
    } catch (e) {
        console.error(e.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
//const pool = require("./db")

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
    console.log("~~~~~~~~~~~~~~~~~~~~~~")
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )

        //console.log(newTodo.rows)
        res.json(newTodo)
        //console.log(req.body)
    } catch (e) {
        console.error(err.message)
    }
})
/*app.get('/', (req, res) => {
    res.send('Hello World!')
})*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
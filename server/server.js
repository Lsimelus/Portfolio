const express = require("express")
const cors = require('cors')
require('dotenv').config();

const app = express()
app.use(cors({
    methods: ['POST', "GET"]
}))
app.use(express.json())


const mongoose = require("mongoose")
var Schema = mongoose.Schema;
const contactFormSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true }
}, { timestamp: true, collection: "ContactForm" })
const ContactForm = mongoose.model("ContactForm", contactFormSchema)
const uri = process.env.URI

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("connected to Mongo")
    } catch (error) {
        console.error(error)
    }
}
connect();

app.get("/api", (req, res) => {
    res.send({"test" : "test"})

})

app.post("/processform", (req, res) => {
    var formData = req.body
    const data = new ContactForm(formData)
    data.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})


app.listen(process.env.PORT || 4001, () => { console.log("server running") })
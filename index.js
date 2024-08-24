import e from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { escapeXML } from "ejs";
import { writeFile } from "fs";
import { readFile } from "fs";

const app = e();
const port = 4000

app.use(bodyParser.urlencoded({extended: true}))

app.use(e.static("Public"))

app.get("/", (req,res) => {
    res.render("header.ejs", {
        content: "Click me to here your quote of the day!",
    })
});

app.get("/off", (req, res) => {
    console.log("off")
    res.render("off.ejs")
})

app.get("/on", async(req, res) => {
    try {
        const result = await axios.get("https://programming-quotesapi.vercel.app/api/random");
        res.render("on.ejs", {
            content: JSON.stringify(result.data.quote),
            author: "-"+result.data.author,
        })
        console.log("on")
    } catch (error) {
        res.status(404).send(error)
    }
})

app.listen(port, (err) => {
    if (err) {throw(err)} else console.log("listening on port "+port)
})


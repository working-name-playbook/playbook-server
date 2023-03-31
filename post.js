const fs = require('fs');
const express = require('express');

let server = express();

server.use(express.json());

server.post("/hello", (req, res) => {
    let name = req.body.name;
    res.send(`Hello, ${name}!`);
});

server.get("/hello", (req, res) => {
    console.log(req.query);
    res.send("ONLY ACCEPTS POST!");
});

server.listen(8080);

// Import required libraries
const express = require('express');

// Create server
let server = express();

server.get("/hello", (req, res) => {
    console.log("SOMEONE SHOWED UP!");
    res.send("Hello, world!");
});

server.get("/goodbye", (req, res) => {
    console.log(req);
    res.end("Goodbyte, cruel world.");
});

server.listen(8080);
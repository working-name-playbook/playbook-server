// Import required libraries
const express = require('express');
const fs = require('fs');

// Create server
let server = express();

// Declare global file name
var temporaryFileName = '';

// Hello!
server.get("/hello", (request, result) => {
    console.log("SOMEONE SHOWED UP!");
    result.send("Hello, world!");
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    temporaryFileName = '';
    for (i = 0; i <= 10; i++) {
        var randomLetterIndex = Math.floor(Math.random() * characters.length);
        var randomLetter = characters[randomLetterIndex];
        temporaryFileName += randomLetter;
    }
    var fileContents = request.query.contents; // this is how (we dooooo iiittt) we retrieve request query params
    fs.mkdir('tempdir', (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("Directory 'tempdir' created successfully!");
    });
    fs.writeFile('tempDir/'+temporaryFileName, fileContents, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("File '"+temporaryFileName+"' created successfully!")
    });
    console.log(request);
});

// Goodbye!
server.get("/goodbye", (request, result) => {
    console.log(request);
    result.send("Goodbyte, cruel world.");
    fs.unlink('tempDir/'+temporaryFileName, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("File '"+temporaryFileName+"' deleted successfuly!")
    })
});

// Localhost port
server.listen(8080);


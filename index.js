// Import required libraries
const express = require('express');
const fs = require('fs');
const axios = require('axios');

// Create server
let server = express();

server.use(express.json());

// Declare global file name
var temporaryFileName = '';

var fileShuttle = {
    sendCodePacket: (codeText, problemID) => {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        temporaryFileName = '';
        for (i = 0; i <= 10; i++) {
            var randomLetterIndex = Math.floor(Math.random() * characters.length);
            var randomLetter = characters[randomLetterIndex];
            temporaryFileName += randomLetter;
        };
        fs.mkdir(problemID, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log("Directory '"+problemID+"' created successfully!");
        });
        fs.writeFile(problemID+'/'+temporaryFileName, codeText, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log("File '"+temporaryFileName+"' created successfully!");
        });
    }
}

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
    var fileContents = request.query.contents; // this is how we (dooooo iiittt) retrieve request query params
    fs.mkdir('tempdir', (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("Directory 'tempdir' created successfully!");
    });
    fs.writeFile('tempdir/'+temporaryFileName, fileContents, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("File '"+temporaryFileName+"' created successfully!");
    });
    console.log(request);
});

// Goodbye!
server.get("/goodbye", (request, result) => {
    console.log(request);
    result.send("Goodbyte, cruel world.");
    fs.unlink('tempdir/'+temporaryFileName, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("File '"+temporaryFileName+"' deleted successfuly!");
    })
});

// Handling a post request
server.post("/hello", (request, result) => {
    console.log(request.body.data);
    result.send("Your post request was successfully received! Huzzah!");
})

// Localhost port
server.listen(8080);

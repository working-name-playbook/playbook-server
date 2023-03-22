// Import required libraries
const express = require('express');
const fs = require('fs');

// Create server
let server = express();

// Declare global file name
var temporaryFileName = '';

// Function to retrieve parameters from a URL
var retrieveUrlParameter = function retrieveUrlParameter(parameterIdentifier) {
    var pageURL = window.location.search.substring(1),
        variablesFromURL = pageURL.split('&'),
        parameterFullyQualified,
        i;

    for (i = 0; i < variablesFromURL.length; i++) {
        parameterFullyQualified = variablesFromURL[i].split('=');

        if (parameterFullyQualified[0] === parameterIdentifier) {
            return parameterFullyQualified[1] === undefined ? true : decodeURIComponent(parameterFullyQualified[1]); // ask Luman about this line
        }
    }
    return false;
};

// Hello!
server.get("/hello", (req, res) => {
    console.log("SOMEONE SHOWED UP!");
    res.send("Hello, world!");
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    temporaryFileName = '';
    for (i = 0; i <= 10; i++) {
        var randomLetterIndex = Math.floor(Math.random() * characters.length);
        var randomLetter = characters[randomLetterIndex];
        temporaryFileName += randomLetter;
    }
    var fileContents = retrieveUrlParameter('contents');
    fs.mkdir("tempDir");
    fs.writeFile("tempDir/"+temporaryFileName, fileContents);
});

// Goodbye!
server.get("/goodbye", (req, res) => {
    console.log(req);
    res.send("Goodbyte, cruel world.");
});

// Localhost port
server.listen(8080);


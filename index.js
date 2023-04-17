// Import required libraries
const express = require('express');
const fs = require('fs-extra');
const axios = require('axios');
const cors = require('cors');
const Docker = require('dockerode');

// Create server
let server = express();

server.use(express.json());

let corsOptions = {
    origin: 'http://localhost:5000'
}

server.use(cors(corsOptions));

// Declare global file name
var randomName = '';

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
server.post("/playbook", (request, result) => {
    console.log(request.body);
    // Creating directory/file name for temporary problem storage
    var problemID = request.body["problemID"];
    result.send("Your post request was successfully received! Huzzah!");
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    randomName = '';
    for (i = 0; i <= 10; i++) {
        var randomLetterIndex = Math.floor(Math.random() * characters.length);
        var randomLetter = characters[randomLetterIndex];
        randomName += randomLetter;
    }
    var fileContents = request.body["payload"];
    // Create temporary problem directory
    fs.mkdir(randomName, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("Directory "+randomName+" created successfully!");
    
        // Copy the relevant activity folder into problem directory
        fs.copy('activities/'+problemID+'/', randomName+'/', function (err) {
            if (err) return console.error(err)
            console.log('success!')

            // Write student-written code to empty src folder in problem directory
            fs.writeFile(randomName+'/src/main.rs', fileContents, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log("File '"+randomName+"' created successfully!");

                // COMMENCE THE WHALE SERENADING
                // Instantiate dockerode w/ Windows-specific socket path
                var docker = new Docker({socketPath: '//./pipe/docker_engine'});

                docker.run(
                    'rustbucket',
                    [],
                    undefined,
                    {"HostConfig": {"Binds": [`${randomName}:/user-container-dir`]}
                }, (err, data, container) => {
                    if (err) {
                        return console.error(err);
                    };
                });
            });
        });
    });
})


// Localhost port
server.listen(8080);


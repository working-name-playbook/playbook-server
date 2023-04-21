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
var docker = new Docker({socketPath: '//./pipe/docker_engine'});

const launchContainer = (folderName) => {
    // COMMENCE THE WHALE SERENADING
    // Instantiate dockerode w/ Windows-specific socket path
    console.log("Dockerode instantiated...")
    docker.run(
        'rustbucket',
        [],
        undefined,
        {"HostConfig": {"Binds": [`${process.cwd()}/${folderName}:/user-container-dir`]}
    }, (err, data, container) => {
        if (err) {
            return console.error(err);
        };
    });
}

const folderHash = () => {
    let randomName = "";
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i <= 10; i++) {
        let randomLetterIndex = Math.floor(Math.random() * characters.length);
        let randomLetter = characters[randomLetterIndex];
        randomName += randomLetter;
    }
    return randomName;
}

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
    let problemID = request.body.problemID;
    result.send("Your post request was successfully received! Huzzah!");
    let fileContents = request.body.payload;
    // Create temporary problem directory
    let randomName = folderHash();
    fs.mkdir(randomName, async (err) => {
        if (err) return console.error(err);
        console.log("Directory "+randomName+" created successfully!");
        // Copy the relevant activity folder into problem directory
        fs.copy('activities/'+problemID+'/', randomName+'/', async (err) => {
            if (err) return console.error(err)
            console.log('success!')
            // Write student-written code to empty src folder in problem directory
            fs.writeFile(randomName+'/src/main.rs', fileContents, (err) => {
                if (err) return console.error(err);
                console.log("File '"+randomName+"' created successfully!");
                // Read the directory
                fs.readdir(randomName, (err, files) => {
                    // If files exist in the newly-created folder
                    if(files) launchContainer(randomName); 
                });
            });
        });
    });
})


// Localhost port
server.listen(8080);
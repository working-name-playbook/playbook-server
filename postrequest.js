// Imports
const axios = require('axios')

// Post request
const postData = {data: "This message was passed to the server via a post request! What a time to be alive!"};

const postRequest = async () => {
    try {
        const result = await axios.post('http://localhost:8080/hello', postData)
        console.log(`Status: ${result.status}`)
        console.log('Body: ', result.data)
    } catch (err) {
        console.error(err)
    }
}

// Instantiate request
postRequest()
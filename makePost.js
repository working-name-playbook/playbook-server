const axios = require('axios');

const run = async () => {
    let response = await axios.post("http://localhost:8080/hello", {
        name: "Doug"
    });
    console.log(response.data);
}

run();

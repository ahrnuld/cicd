const http = require('http');
const querystring = require('querystring');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');


    // handle GET request
    if (req.method === 'GET') {
        res.end('Hi from inholland! Please send a POST request to this URL with your name, email and message as parameters');
    }

    // handle POST request
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); 
        });


        req.on('end', () => {
            let parsedData = querystring.decode(body)
            console.log(parsedData);
            if (parsedData.name === undefined || parsedData.email === undefined || parsedData.message === undefined) {
                res.end("Sorry, you haven't posted all the fields!");
            } else {
                res.end("Well done " + parsedData.name + "! You have sent " + parsedData.email + " and " + parsedData.message);
            }
        });
    }
});

server.listen(port);
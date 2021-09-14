//server.js: Imports app.js and binds it to port 8080.

//Where we create a new http server from the express function and bind it to a port to listen for HTTP requests
//Supertest take care of the port binding which makes the tests much cleaner and easier to write

import app from './app.js'

app.listen(8080, () => console.log("listening on port 8080"))
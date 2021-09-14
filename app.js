//app.js: Contains the express code to define and implement all of the HTTP routes.

import express from 'express'

const app = express()

app.use(express.json())
//For TC1: This should fail with a Timeout error because server isn’t responding to the client. Let’s make this pass by changing the post('/users') endpoint
app.post('/users', async (req, res) => {
  const { password, username } = req.body
  //if password or username is false
  if (!password || !username) {
    res.sendStatus(400)
    return
  }
  
  //For TC2: If we pass a javascript object to res.send, express will strinigfy the object and set the content-type to application/json.
  // res.send({})
  
  //For TC3: to make sure the response object contains a userID, we can make it pass by changing the api
  res.send({ userId: 1 })
  
})

export default app

/*
// ----- Follow Steps as below ---------

// Step 1 - Express Apps
//create a new http server from the "express" library/function and bind it to a port to listen for HTTP requests
import express from 'express'

const app = express()

app.get('/test', (req, res) => {
  res.send("🤗")
})

app.listen(8080, () => console.log("listening on port 8080"))

// Step 2 - When we write tests for the server using supertest,
//we can actually let supertest take care of the port binding
//which makes the tests much cleaner and easier to write. In order to do this,
//we won’t call app.listen here. Instead we should remove the app.listen line and just export app from this file.
//Then in our test file, we can import app and use supertest to test the api
export default app

// Step 3 -
import express from 'express'

const app = express()

app.post('/users', (req, res) => {
  //put code here
})

export default app

*/
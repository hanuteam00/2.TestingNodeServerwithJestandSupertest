//app.test.js: Imports app.js and use supertest to test all of the api/endpoints.
//test that a POST request to /users works correctly

import 'regenerator-runtime/runtime'
import request from "supertest";
import app from './app.js';


describe("Scenario 1: POST /users", () => {
  describe("Test Suite 1: when passed a username and password", () => {
    // TC1: should respond with a 200 status code
    // TC2: should specify json as the content type in the http header.
    // TC3: should respond with a json object that contains the id from the database. (probably jwt in the real world)
    // TC1: should save the username and password in the database
    test("TC1: should respond with a 200 status code", async () => {
      //request(app): pass the express app to the request() function, supertest will bind the app to some port and listen for http requests
      //post(): request() abstracts away all of the http request code so we can just call .post or .get or whatever to make the http request to our server
      //send(): When it’s a post request, we can use .send to add post body data and supertest will take of converting it to JSON and setting the request content type.
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      //response object contains all of the details about the HTTP response from the server
      //console.log(response)
      expect(response.statusCode).toBe(200)
    })

    test("TC2: should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      //use some jest’s stringContaining function to make sure the content-type contains ‘json’
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    test("TC3: response has userId", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.body.userId).toBeDefined()
    })
  }) //end of TS 1

  describe("Test Suite 2: when the username and password is missing", () => {
    // TC11: should return a 400 status code to show there was a user error.
    // TC2: should return a json object that contains an error message.
    // TC3: should specify json as the content type in the http header.
    test("TC1: should respond with a status code of 400", async () => {
      const bodyData = [
        { username: "username" },
        { password: "password" },
        //check what happens when neither username nor password are provided by {}
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  }) // end of TS 2

}) // end of Scenario 1

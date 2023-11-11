const app = require('../src/app')
const request = require('supertest')
const {Show, User} = require ('../models/index')

describe('User Testing', () => {
    /*
    Tests:
    1. Get All Users
    2. Get One User
    3. Can create a username
        3a. Cannot create a username if field 'username' is less than three character or empty.
        3b. Cannot create a username if field 'password' is less than eight characters or empty.
        3c. Cannot create a username if both fields are empty
    4. Can get all shows watched by a user
    5. Can add a show to a user if they have watched it (/:id/shows/:showid)
    6. Can delete a user
    */

    test('1+1', () => {
        expect(1+1).toBe(2)
    })
})
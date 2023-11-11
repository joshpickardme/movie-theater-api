const app = require('../src/app')
const request = require('supertest')
const {Show, User} = require ('../models/index')
const { AUTH } = require('sqlite3')

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

    test('can get all users', async () => {
        const allUsers = await request(app).get('/users')
        expect(allUsers.length).toBe(allUsers.length)
    })

    test('can get one user', async () => {
        const oneUser = await request(app).get('/users/5')
        expect(oneUser.body).toBeTruthy()
    })

    test('can create a user', async () => {
        const createUser = await request(app).post('/users').send({
            'username': 'createdUserForTest',
            'password': 'createdPasswordForTest'
        })

        const getUser = createUser.body[createUser.body.length - 1]

        const getUserByPk = await request(app).get(`/users/${getUser.id}`)
        expect(getUserByPk.body.username).toBe("createdUserForTest")
    })

    test('cannot create a username if username field is less than three characters or empty', async () => {
        const createUser = await request(app).post('/users').send({
            "username": 'a',
            "password": 'asdoiuwsdiuasdyf'
        })
        expect(createUser.body[0].msg).toBe("Invalid value")
        expect(createUser.body[0].path).toBe("username")
    })

    test('cannot create a username if password field is less than eight characters or empty', async () => {
        const createUser = await request(app).post('/users').send({
            "username": 'abgasduyagsd',
            "password": 'sir'
        })
        expect(createUser.body[0].msg).toBe("Invalid value")
        expect(createUser.body[0].path).toBe("password")
    })

    test('cannot create a username if both input fields are empty', async () => {
        const createUser = await request(app).post('/users').send({
            "username": '',
            "password": ''
        })
        expect(createUser.body.length).toBe(4)
    })

    test('can get all shows watched by a user', async () => {
        const createUser = await request(app).post('/users').send({
            "username": 'showsWatched',
            "password": 'showsWatched'
        })

        

        const getUser = createUser.body[createUser.body.length - 1]

        // PUT Some shows
        await request(app).put(`/users/${getUser.id}/shows/10`)
        await request(app).put(`/users/${getUser.id}/shows/11`)
        await request(app).put(`/users/${getUser.id}/shows/12`)

        const allShowsWatched = await request(app).get(`/users/${getUser.id}/shows`)

        expect(allShowsWatched.body.length).toBe(3)
    })

    test('can add a show if a user has watched it', async () => {
        const createUser = await request(app).post('/users').send({
            "username": 'showsWatched',
            "password": 'showsWatched'
        })

        const getUser = createUser.body[createUser.body.length - 1]
        await request(app).put(`/users/${getUser.id}/shows/10`)
        const allShowsWatched = await request(app).get(`/users/${getUser.id}/shows`)

        expect(allShowsWatched.body[0].title).toBe("Test Show")
    })

    test('can delete a user', async () => {
        const createUser = await request(app).post('/users').send({
            "username": 'toBeDeleted',
            'password': "toBeDeleted"
        })

        const getUser = createUser.body[createUser.body.length - 1];

        await request(app).delete(`/users/${getUser.id}`)

        const getDeletedUser = await request(app).get(`/users${getUser.id}`)
        expect(getDeletedUser.body.title).toBeFalsy()
    })
})
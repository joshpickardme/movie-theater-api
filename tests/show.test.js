const app = require('../src/app')
const request = require('supertest')
const {Show, User} = require ('../models/index')
const { createTestScheduler } = require('jest')

describe('Show Testing', () => {
    
    test('can get all shows', async () => {
        const shows = await request(app).get('/shows')
        expect(shows.length).toBe(shows.length)
    })

    test('can get one show', async () => {
        const show = await request(app).get('/shows/7')
        expect(show.body.title).toBe('hggg')
    })

    test('can create a show', async () => {
        const getAllShowsBefore = await request(app).get('/shows')
        const createShow = await request(app).post('/shows').send({
            "title": 'Test Show',
            "genre": 'genreTest',
            "rating": 5,
            "available": true
        })
        const getShows = await request(app).get('/shows')

        expect(getShows.body.length).toBe(getAllShowsBefore.body.length + 1)
    })

    test('cannot create a show if title is empty', async () => {
        const createShow = await request(app).post('/shows').send({
            "title": "",
            "genre": 'genreTest',
            "rating": 5,
            "available": true
        })
        expect(createShow.body[0].msg).toBe("Invalid value")
        expect(createShow.body[0].path).toBe("title")
    })

    test('cannot create a show if genre is empty', async () => {
        const createShow = await request(app).post('/shows').send({
            "title": "Test Show",
            "genre": '',
            "rating": 5,
            "available": true
        })
        expect(createShow.body[0].msg).toBe("Invalid value")
        expect(createShow.body[0].path).toBe("genre")
    })

    test('cannot create a show if rating is empty', async () => {
        const createShow = await request(app).post('/shows').send({
            "title": "Test Show",
            "genre": 'genreTest',
            "rating": '',
            "available": true
        })
        expect(createShow.body[0].msg).toBe("Invalid value")
        expect(createShow.body[0].path).toBe("rating")
    })

    test('cannot create a show if available is empty', async () => {
        const createShow = await request(app).post('/shows').send({
            "title": "test show",
            "genre": 'genreTest',
            "rating": 5,
            "available": ""
        })
        expect(createShow.body[0].msg).toBe("Invalid value")
        expect(createShow.body[0].path).toBe("available")
    })

    test('can get all shows from a specific genre', async () => {
        const getShows = await request(app).get('/shows/genre/Fantasy')
        expect(getShows.length).toBe(getShows.length)
    })

    test('can update the rating of a show', async () => {
        const createShow = await request(app).post('/shows').send({
            "title": 'TestShow',
            "genre": 'genreTest',
            "rating": 5,
            "available": true
        })

        const getShow = createShow.body[createShow.body.length - 1]

        await request(app).put(`/shows/${getShow.id}`).send({
            "rating": 2
        })
        const getUpdatedShow = await request(app).get(`/shows/${getShow.id}`)

        expect(getUpdatedShow.body.rating).toBe(2)
    })

    test('can update the availability of a show', async () => {
        const createShow = await request(app).post('/shows').send({
            "title": 'testAvailability',
            'genre': 'testGenreAvailability',
            'rating': 3,
            'available': false
        })
        const getShow = createShow.body[createShow.body.length - 1]

        await request(app).put(`/shows/${getShow.id}/update`).send({
            "available": true
        })

        const getUpdatedShow = await request(app).get(`/shows/${getShow.id}`)

        expect(getUpdatedShow.body.available).toBe(true)
    })

    test('can delete a show', async () => {
        const createShow = await request(app).post('/shows').send({
            "title": 'toBeDeleted',
            "genre": 'toBeDeleted',
            "rating": 5,
            "available": false
        })

        const getShow = createShow.body[createShow.body.length - 1]

        await request(app).delete(`/shows/${getShow.id}`)

        const getUpdatedShow = await request(app).get(`/shows/${getShow.id}`)
        expect(getUpdatedShow.body).toBe(null)
    })
})
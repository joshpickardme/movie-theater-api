const express = require('express')
const router = express.Router()
const {User, Show} = require('../models/index')
const {check, validationResult} = require('express-validator')

router.get('/', async (req, res) => { // All Shows
    const shows = await Show.findAll()
    res.json(shows)
})

router.get('/:id', async (req, res) => { // One Show
    const params = req.params
    const show = await Show.findByPk(params.id)
    res.json(show)
})

router.post('/', [
    //{"title": "hggg", "genre": "o", "rating": "bad", "available": "yes"}
    check("title").trim().not().isEmpty(),
    check("genre").trim().not().isEmpty(),
    check("rating").trim().not().isEmpty(),
    check("available").trim().not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if(errors.isEmpty()) {
        // No Errors
        const createShow = await Show.create(req.body)
        const allShows = await Show.findAll()
        res.json(allShows)
    } else {
        // Errors
        res.json(errors.array())
        
    }


})

router.get('/genre/:tag', async (req, res) => { // All shows of specific genre
    const params = req.params
    const shows = await Show.findAll({where: {genre: params.tag}})
    res.json(shows)
})

router.put('/:id', [check("rating").trim().not().isEmpty()], async (req, res) => { // Updates rating of a show
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        // No Errors
        const params = req.params
        const show = await Show.findByPk(params.id)
        await show.update(req.body)
        const shows = await Show.findAll()
        res.json(shows)
    } else {
        // Errors
        res.json({"error": errors.array()})
    }

})

router.put('/:id/update', [check("available").trim().not().isEmpty().isBoolean()], async (req, res) => { // Updates status of show stored with key of available
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        // No Errors
        const params = req.params
        const show = await Show.findByPk(params.id)
        await show.update(req.body)
        const shows = await Show.findAll()
        res.json(shows)
    } else {
        // Errors
        res.json(errors.array())
    }

})

router.delete('/:id', async (req, res) => {
    const params = req.params;
    const show = await Show.findByPk(params.id)
    const shows = await Show.findAll()
    const destroyedShow = await show.destroy()
    res.json(shows)
})





module.exports = router;
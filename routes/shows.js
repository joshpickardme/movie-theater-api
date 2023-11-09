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

router.get('/genre/:tag', async (req, res) => { // All shows of specific genre
    const params = req.params
    const shows = await Show.findAll({where: {genre: params.tag}})
    res.json(shows)
})

router.put('/:id', async (req, res) => { // Updates rating of a show
    const params = req.params
    const show = await Show.findByPk(params.id)
    await show.update(req.body)
    const shows = await Show.findAll()
    res.json(shows)
})

router.put('/:id/update', async (req, res) => { // Updates status of show stored with key of available
    const params = req.params
    const show = await Show.findByPk(params.id)
    await show.update(req.body)
    const shows = await Show.findAll()
    res.json(shows)
})

router.delete('/:id', async (req, res) => {
    const params = req.params;
    const show = await Show.findByPk(params.id)
    const shows = await Show.findAll()
    const destroyedShow = await show.destroy()
    res.json(shows)
})





module.exports = router;
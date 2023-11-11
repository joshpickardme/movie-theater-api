const express = require('express')
const router = express.Router()
const {User, Show} = require('../models/index')
const {check, validationResult} = require('express-validator')

// Middleware
router.use(express.json())
router.use(express.urlencoded())

// Routes
router.get('/', async (req, res) => { // All Users
    const users = await User.findAll()
    res.json(users)
})

router.get('/:id', async (req, res) => { // One User
    const params = req.params
    const user = await User.findByPk(params.id)
    res.json(user)
})

router.post('/', [check("username").trim().not().isEmpty().isLength({min: 3}), check("password").trim().not().isEmpty().isLength({min: 8})], async (req, res) => { // Creating a user
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        // No Errors
        const createUser = await User.create(req.body)
        const allUsers = await User.findAll()
        res.json(allUsers)
    } else {
        res.json(errors.array())
    }

})

router.get('/:id/shows', async (req, res) => { // All shows watched by a user
    const params = req.params;
    const user = await User.findByPk(params.id)
    res.json(await user.getShows())
}) 

router.put('/:id/shows/:showid', async (req, res) => { // Adds a show if a user has watched it
    const params = req.params
    const user = await User.findByPk(params.id)
    const show = await Show.findByPk(params.showid)
    await user.addShow(show)
    res.json(await user.getShows())
})

router.delete('/:id', async (req, res) => {
    const params = req.params
    const user = await User.findByPk(params.id)
    const destroyedUser = await user.destroy()
    const allUsers = await User.findAll()
    res.json(allUsers)
})

module.exports = router
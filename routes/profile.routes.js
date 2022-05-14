const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.patch('/update', auth, async (req, res) => {
    try {
        const {name} = req.body
        const user = await User.findByIdAndUpdate(req.user.userId, { name: name })
        res.status(200).json({ user })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router

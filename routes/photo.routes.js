const {Router} = require('express')
const config = require('config')
const Photo = require('../models/Photo')
const auth = require('../middleware/auth.middleware')
const {ObjectId} = require("mongoose/lib/types");
const router = Router()

router.post('/upload', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {name, image} = req.body
        const existing = await Photo.findOne({ name })

        if (image.includes('data:image')) {
            if (existing) {
                return res.json({ photo: existing })
            }
            const photo = new Photo({
                name, image, owner: req.user.userId
            })

            await photo.save(function(err, doc) {
                if (err) return console.error(err);
                console.log("Photo inserted successfully!");
            });

            res.status(201).json({ photo })
        }
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


router.post('/delete', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {photoId} = req.body
        const response = await Photo.deleteOne({"_id": ObjectId(photoId)})
        console.log(response)
        res.status(200).json({ message: 'Фотография удалена' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user.userId)
        const photos = await Photo.aggregate([
            { $match: {owner: ObjectId(req.user.userId)} },
            {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'user_data'
                }
            }
        ])
        res.json(photos)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/public', auth, async (req, res) => {
    try {
        const photos = await Photo.aggregate([
            { $match: {private: true}},
            {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'user_data'
                }
            }
        ])
        res.json(photos)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router

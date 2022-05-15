const {Router} = require('express')
const config = require('config')
const Photo = require('../models/Photo')
const auth = require('../middleware/auth.middleware')
const {ObjectId} = require("mongoose/lib/types");
const User = require("../models/User");
const router = Router()

router.put('/upload', auth, async (req, res) => {
    try {
        console.log(req.body.description)
        const {image, name, description, public} = req.body

        if (image.includes('data:image')) {

            const photo = new Photo({
                name, description, image, public, owner: req.user.userId
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

router.patch('/update', auth, async (req, res) => {
    try {
        const {id, name, description, public} = req.body
        const photo = await Photo.findByIdAndUpdate(id, { name: name, description: description, public: public })
        res.status(200).json({ photo })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


router.delete('/delete', auth, async (req, res) => {
    try {
        const {photoId} = req.body
        const response = await Photo.deleteOne({"_id": ObjectId(photoId)})
        // console.log(response)
        res.status(200).json({ message: 'Фотография удалена' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


router.get('/', auth, async (req, res) => {
    try {
        // console.log(req.user.userId)
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
            { $match: {public: true}},
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

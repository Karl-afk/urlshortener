const express = require('express')
const router = express.Router()
const ShortUrl = require('../models/shortUrl')

router.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

router.post('/shortUrls', async (req, res) => {
    console.log(req.body)
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})

router.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})

module.exports = router;
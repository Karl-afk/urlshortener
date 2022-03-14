const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const todos = require('./router/todoRoutes')
const indexRouter = require('./router')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})
.catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:false}))
app.use('/todos', todos)
app.use('/', indexRouter)


// app.get('/', async (req, res) => {
//     const shortUrls = await ShortUrl.find()
//     res.render('index', {shortUrls: shortUrls})
// })

// app.post('/shortUrls', async (req, res) => {
//     console.log(req.body)
//     await ShortUrl.create({full: req.body.fullUrl})
//     res.redirect('/')
// })

// app.get('/:shortUrl', async (req, res) => {
//     const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
//     if(shortUrl == null) return res.sendStatus(404)

//     shortUrl.clicks++
//     shortUrl.save()
//     res.redirect(shortUrl.full)
// })



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
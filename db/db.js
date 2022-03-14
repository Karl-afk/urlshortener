const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})
.catch(err => console.log(err))
const connection = mongoose.connection
module.exports = connection;